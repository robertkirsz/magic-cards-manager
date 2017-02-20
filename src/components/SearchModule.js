import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce'
import _every from 'lodash/every'
import _find from 'lodash/find'
import _camelCase from 'lodash/camelCase'
import { filterAllCards } from 'store/allCards'
import { filterMyCards } from 'store/myCards'
import { ColorFilter, CmcFilter, ColorButtons } from 'components'

const clearState = {
  queryName: '',
  queryTypes: '',
  queryText: '',
  cmcValue: 0,
  cmcType: 'minimum', // 'minimum' || 'exactly' || 'maximum'
  monocoloredOnly: false,
  multicoloredOnly: false,
  colors: {
    White: true,
    Blue: true,
    Black: true,
    Red: true,
    Green: true,
    Colorless: true
  }
}

const mapStateToProps = ({ location }) => ({
  pathname: location.pathname
})

const mapDispatchToProps = { filterAllCards, filterMyCards }

class SearchModule extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    filterAllCards: PropTypes.func.isRequired,
    filterMyCards: PropTypes.func.isRequired
  }

  state = {
    ...clearState,
    whereToSearch: this.props.pathname === '/all-cards'
      ? 'allCards'
      : 'myCards'
  }

  debouncedFilter = _debounce(state => { this.filter(state) }, 300, { leading: true })

  componentWillReceiveProps ({ pathname }) {
    // When route changes and only if it's one of the card list pages...
    if (this.props.pathname !== pathname && (pathname === 'all-cards' || pathname === 'my-cards')) {
      // Save information of the collection that will be filtered
      const whereToSearch = _camelCase(pathname)
      this.setState({ whereToSearch })
      // Filter it
      this.filter({ ...this.state, whereToSearch })
    }
  }

  // Reverts to initial state
  clearState = () => {
    const newState = { ...clearState }
    newState.whereToSearch = this.state.whereToSearch
    this.setState(newState)
    this.filter(newState)
  }

  // Updates various search queries
  updateQuery = (property, value) => {
    const newState = { ...this.state }
    newState[property] = value
    this.setState(newState)
    this.debouncedFilter(newState)
  }

  // Updates card color query
  handleChangeColor = (color, state) => {
    const newState = { ...this.state }
    newState.colors[color] = state
    this.setState(newState)
    this.debouncedFilter(newState)
  }

  handleChangeMonocolored = () => {
    const newState = { ...this.state }
    newState.monocoloredOnly = !this.state.monocoloredOnly
    newState.multicoloredOnly = false
    this.setState(newState)
    this.debouncedFilter(newState)
  }

  handleChangeMulticolored = () => {
    const newState = { ...this.state }
    newState.multicoloredOnly = !this.state.multicoloredOnly
    newState.monocoloredOnly = false
    this.setState(newState)
    this.debouncedFilter(newState)
  }

  // Turns on or off all the color buttons
  toggleColors = state => {
    const newState = { ...this.state }
    newState.colors = {
      White: state,
      Blue: state,
      Black: state,
      Red: state,
      Green: state,
      Colorless: state
    }
    this.setState(newState)
    this.debouncedFilter(newState)
  }

  // Returns filtering function that will be used by reducers to filter cards
  search = state => {
    const queryName = state.queryName.trim().toLowerCase()
    const queryTypes = state.queryTypes.toLowerCase().split(' ')
    const queryText = state.queryText.trim().toLowerCase()

    return card => {
      // Hide cards with no text when text is specified
      if (queryText && !card.text) return false
      // Checking card name
      const nameOk = card.name.toLowerCase().indexOf(queryName) > -1
      // Checking card types
      const typeOk = queryTypes.length
        ? _every(queryTypes, qt => (
            _find(card.types, ct => ct.toLowerCase().indexOf(qt) > -1) ||
            _find(card.subtypes, cst => cst.toLowerCase().indexOf(qt) > -1)
          ))
        : true
      // Checking card types
      const textOk = card.text
        ? card.text.toLowerCase().indexOf(queryText) > -1
        : true
      // Checking card colors
      const colorsOk = card.colors
        ? _find(card.colors, color => state.colors[color])
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
    }
  }

  // Passes filtering function to a particular reducer
  filter = state => {
    if (state.whereToSearch === 'allCards') this.props.filterAllCards(this.search(state))
    if (state.whereToSearch === 'myCards') this.props.filterMyCards(this.search(state))
  }

  focusNameInput = () => {
    this.refs.nameInput.select()
  }

  render () {
    const {
      queryName, queryTypes, queryText, colors,
      monocoloredOnly, multicoloredOnly, cmcValue, cmcType
    } = this.state

    const searchButton = (
      <button
        className="search-button fa fa-search"
        aria-hidden="true"
        onMouseEnter={this.focusNameInput}
      />
    )

    const searchForm = (
      <div className="search-form">
        <div className="text-inputs form-group">
          <input
            type="text"
            className="form-control"
            ref="nameInput"
            placeholder="Name"
            value={queryName}
            onChange={e => this.updateQuery('queryName', e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Type"
            value={queryTypes}
            onChange={e => this.updateQuery('queryTypes', e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Text"
            value={queryText}
            onChange={e => this.updateQuery('queryText', e.target.value)}
          />
        </div>
        <div className="color-filter-group form-group">
          <ColorFilter
            colors={colors}
            onColorChange={this.handleChangeColor}
          />
          <ColorButtons
            colors={colors}
            toggleAll={() => { this.toggleColors(true) }}
            toggleNone={() => { this.toggleColors(false) }}
            monocoloredOnly={monocoloredOnly}
            multicoloredOnly={multicoloredOnly}
            handleChangeMonocolored={this.handleChangeMonocolored}
            handleChangeMulticolored={this.handleChangeMulticolored}
          />
        </div>
        <CmcFilter
          cmcValue={cmcValue}
          cmcType={cmcType}
          changeCmcValue={value => this.updateQuery('cmcValue', value)}
          changeCmcType={value => this.updateQuery('cmcType', value)}
        />
        <div>
          <button className="btn" onClick={this.clearState}>Reset</button>
        </div>
      </div>
    )

    return (
      <div className="search-module">
        {searchButton}
        {searchForm}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModule)
