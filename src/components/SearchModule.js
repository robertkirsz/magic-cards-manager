import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { filterCards } from 'store/allCards'
import ColorFilter from 'components/ColorFilter'

export class SearchModule extends Component {
  static propTypes = {
    cards: PropTypes.array,
    filterCards: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeTypes = this.handleChangeTypes.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleChangeConvertedManaCost = this.handleChangeConvertedManaCost.bind(this)
    this.handleChangeMonocolored = this.handleChangeMonocolored.bind(this)
    this.handleChangeMulticolored = this.handleChangeMulticolored.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.toggleNone = this.toggleNone.bind(this)
    this.search = this.search.bind(this)

    this.state = {
      queryName: '',
      queryTypes: '',
      queryText: '',
      convertedManaCost: 0,
      cmcType: 'minimum',
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
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('   %cSearchModule componentDidUpdate()', 'color: #79BDA8;')
    this.props.filterCards(this.search(this.state))
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('   %cSearchModule shouldComponentUpdate()', 'color: #79BDA8;', nextState !== this.state)
    return nextState !== this.state
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

  handleChangeColor (e) {
    this.setState({
      colors: {
        ...this.state.colors,
        [e.target.value]: e.target.checked
      }
    })
  }

  handleChangeConvertedManaCost (e) {
    this.setState({
      convertedManaCost: parseInt(e.target.value, 10)
    })
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
    let colorsArray = []

    for (let key in state.colors)
      if (state.colors[key]) colorsArray.push(key)

    if (queryName.length || queryTypes.length || queryText.length) {
      return this.props.cards.filter((card) => {
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
          : this.state.colors.Colorless
        // Monocolored only test
        let monoOk = true
        if (this.state.monocoloredOnly && card.colors && card.colors.length !== 1) monoOk = false
        // Multicolored only test
        let multiOk = true
        if (this.state.multicoloredOnly && (!card.colors || (card.colors && card.colors.length < 2))) multiOk = false
        // Converted mana cost test
        let cmcOk = false
        if (this.state.cmcType === 'minimum' && (card.cmc || 0) >= this.state.convertedManaCost) cmcOk = true
        if (this.state.cmcType === 'exactly' && (card.cmc || 0) === this.state.convertedManaCost) cmcOk = true
        if (this.state.cmcType === 'maximum' && (card.cmc || 0) <= this.state.convertedManaCost) cmcOk = true

        return nameOk && typeOk && textOk && colorsOk && cmcOk && monoOk && multiOk
      })
    }
  }

  render () {
    return (
      <div className="search-module">
        <input
          type="text"
          className="search-module__input-field"
          value={this.state.queryName}
          onChange={this.handleChangeName}
          placeholder="Name"
          />
        <input
          type="text"
          className="search-module__input-field"
          value={this.state.queryTypes}
          onChange={this.handleChangeTypes}
          placeholder="Type"
          />
        <input
          type="text"
          className="search-module__input-field"
          value={this.state.queryText}
          onChange={this.handleChangeText}
          placeholder="Text"
          />
        <ColorFilter colors={this.state.colors} onChange={this.handleChangeColor} />
      </div>
    )
  }
}

const mapDispatchToProps = { filterCards }

const mapStateToProps = ({ allCards }) => ({ cards: allCards.cards })

export default connect(mapStateToProps, mapDispatchToProps)(SearchModule)
