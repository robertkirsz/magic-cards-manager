import React, { Component, PropTypes } from 'react'
// import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import cn from 'classnames'
import { filterAllCards } from 'store/allCards'
import { filterMyCards } from 'store/myCards'
import { openSearchModule, closeSearchModule } from 'store/layout'
import { ColorFilter, CmcFilter, ColorButtons } from 'components'
import { cardsDatabase } from 'database'
// import { isContainedIn } from 'utils'

const clearState = {
  queryName: '',
  queryTypes: '',
  queryText: '',
  cmcValue: 0,
  cmcType: 'minimum', // 'minimum' || 'exactly' || 'maximum'
  monocoloredOnly: false,
  multicoloredOnly: false,
  colors: {
    'White': true,
    'Blue': true,
    'Black': true,
    'Red': true,
    'Green': true,
    'Colorless': true
  }
}

const mapStateToProps = ({ myCards, location, layout }) => ({
  allCards: cardsDatabase,
  myCards: myCards.cards,
  pathname: location.pathname,
  searchModule: layout.searchModule
})

const mapDispatchToProps = { filterAllCards, filterMyCards, openSearchModule, closeSearchModule }

export class SearchModule extends Component {
  static propTypes = {
    allCards: PropTypes.array,
    myCards: PropTypes.array,
    pathname: PropTypes.string,
    filterAllCards: PropTypes.func,
    filterMyCards: PropTypes.func,
    searchModule: PropTypes.bool,
    openSearchModule: PropTypes.func,
    closeSearchModule: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.clearState = this.clearState.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeTypes = this.handleChangeTypes.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleChangeCmcValue = this.handleChangeCmcValue.bind(this)
    this.handleChangeCmcType = this.handleChangeCmcType.bind(this)
    this.handleChangeMonocolored = this.handleChangeMonocolored.bind(this)
    this.handleChangeMulticolored = this.handleChangeMulticolored.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.toggleNone = this.toggleNone.bind(this)
    this.search = this.search.bind(this)
    this.toggleSearchModule = this.toggleSearchModule.bind(this)
    this.windowClick = this.windowClick.bind(this)

    this.state = {
      ...clearState,
      whereToSearch: props.pathname === '/all-cards'
        ? 'allCards'
        : 'myCards'
    }
  }

  componentDidMount () {
    window.addEventListener('click', this.windowClick)
  }

  componentDidUpdate () {
    // TODO: check if it's truely the best way to handle this (in a 'didUpdate' - I don't like it >:/)
    if (this.state.whereToSearch === 'allCards')
      this.props.filterAllCards(this.search(this.state))
    else
      this.props.filterMyCards(this.search(this.state))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      const whereToSearch = nextProps.pathname === '/all-cards'
        ? 'allCards'
        : 'myCards'
      this.setState({ whereToSearch })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.windowClick)
  }

  windowClick (e) {
    // if (this.props.searchModule) {
      // const clickedOut = !isContainedIn(e.target, findDOMNode(this.refs.wrapper))
      // console.warn('clickedOut', clickedOut)
      // if (clickedOut) this.toggleSearchModule()
    // }
  }

  // TODO: Refactor this since a lot if them do the same thing

  clearState () {
    this.setState(clearState)
  }

  handleChangeName (e) {
    this.setState({
      queryName: e.target.value
    })
  }

  handleChangeTypes (e) {
    this.setState({
      queryTypes: e.target.value
    })
  }

  handleChangeText (e) {
    this.setState({
      queryText: e.target.value
    })
  }

  handleChangeColor (color, state) {
    this.setState({
      colors: {
        ...this.state.colors,
        [color]: state
      }
    })
  }

  handleChangeCmcValue (cmcValue) {
    this.setState({ cmcValue })
  }

  handleChangeCmcType (cmcType) {
    this.setState({ cmcType })
  }

  handleChangeMonocolored () {
    this.setState({
      monocoloredOnly: !this.state.monocoloredOnly,
      multicoloredOnly: false
    })
  }

  handleChangeMulticolored () {
    this.setState({
      multicoloredOnly: !this.state.multicoloredOnly,
      monocoloredOnly: false
    })
  }

  toggleAll () {
    this.setState({
      colors: {
        'White': true,
        'Blue': true,
        'Black': true,
        'Red': true,
        'Green': true,
        'Colorless': true
      }
    })
  }

  toggleNone () {
    this.setState({
      colors: {
        'White': false,
        'Blue': false,
        'Black': false,
        'Red': false,
        'Green': false,
        'Colorless': false
      }
    })
  }

  search (state) {
    const queryName = state.queryName.trim().toLowerCase()
    const queryTypes = state.queryTypes.toLowerCase().split(' ')
    const queryText = state.queryText.trim().toLowerCase()
    const colorsArray = []

    for (const key in state.colors) if (state.colors[key]) colorsArray.push(key)

    if (queryName.length || queryTypes.length || queryText.length) {
      return this.props[state.whereToSearch].filter((card) => {
        // Hide cards with no text when text is specified
        if (queryText && !card.text) return false
        // Checking card name
        const nameOk = card.name.toLowerCase().indexOf(queryName) > -1
        // Checking card types
        const typeOk = queryTypes.length
          ? _.every(queryTypes, qt => (
              _.find(card.types, ct => ct.toLowerCase().indexOf(qt) > -1) ||
              _.find(card.subtypes, cst => cst.toLowerCase().indexOf(qt) > -1)
            ))
          : true
        // Checking card types
        const textOk = card.text
          ? card.text.toLowerCase().indexOf(queryText) > -1
          : true
        // Checking card colors
        const colorsOk = card.colors
          ? colorsArray.filter((val) => card.colors.indexOf(val) !== -1).length > 0
          : state.colors.Colorless
        // Monocolored only test
        let monoOk = true
        if (state.monocoloredOnly && card.colors && card.colors.length !== 1) monoOk = false
        // Multicolored only test
        let multiOk = true
        if (state.multicoloredOnly && (!card.colors || (card.colors && card.colors.length < 2))) multiOk = false
        // Converted mana cost test
        let cmcOk = false
        if (state.cmcType === 'minimum' && (card.cmc || 0) >= state.cmcValue) cmcOk = true
        if (state.cmcType === 'exactly' && (card.cmc || 0) === state.cmcValue) cmcOk = true
        if (state.cmcType === 'maximum' && (card.cmc || 0) <= state.cmcValue) cmcOk = true

        return nameOk && typeOk && textOk && colorsOk && cmcOk && monoOk && multiOk
      })
    }
  }

  toggleSearchModule () {
    if (this.props.searchModule) this.props.closeSearchModule()
    else this.props.openSearchModule()
  }

  render () {
    const { searchModule } = this.props

    const searchButton = (
      <button
        className="search-button fa fa-search"
        aria-hidden="true"
        onClick={this.toggleSearchModule}
      />
    )

    const searchForm = (
      <div className="search-form">
        {/* <SearchQuerySummary {...this.state} /> */}
        <div className="text-inputs form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={this.state.queryName}
            onChange={this.handleChangeName}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Type"
            value={this.state.queryTypes}
            onChange={this.handleChangeTypes}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Text"
            value={this.state.queryText}
            onChange={this.handleChangeText}
          />
        </div>
        <div className="color-filter-group form-group">
          <ColorFilter
            colors={this.state.colors}
            onColorChange={this.handleChangeColor}
          />
          <ColorButtons
            colors={this.state.colors}
            toggleAll={this.toggleAll}
            toggleNone={this.toggleNone}
            monocoloredOnly={this.state.monocoloredOnly}
            multicoloredOnly={this.state.multicoloredOnly}
            handleChangeMonocolored={this.handleChangeMonocolored}
            handleChangeMulticolored={this.handleChangeMulticolored}
          />
        </div>
        <CmcFilter
          cmcValue={this.state.cmcValue}
          cmcType={this.state.cmcType}
          changeCmcValue={this.handleChangeCmcValue}
          changeCmcType={this.handleChangeCmcType}
        />
        <div>
          <button className="btn" onClick={this.clearState}>Reset</button>
        </div>
      </div>
    )

    return (
      <div className={cn('search-module', { 'search-module--hidden': !searchModule })}>
        <span className="close-icon fa fa-times" onClick={this.toggleSearchModule} />
        {searchForm}
        {searchButton}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModule)
