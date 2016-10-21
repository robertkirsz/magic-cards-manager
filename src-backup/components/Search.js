import React from 'react'

class Search extends React.Component {
  static propTypes = {
    collectionToSearchIn: React.PropTypes.array,
    onSearch: React.PropTypes.func,
    title: React.PropTypes.string,
    allowToFilterWholeCollection: React.PropTypes.bool // Allows to filter whole collection by mana (no need to type name or text first)
  }

  constructor () {
    super()
    this.state = {
      queryName: '',
      queryTypes: '',
      queryText: '',
      convertedManaCost: 0,
      cmcType: 'minimum',
      monocoloredOnly: false,
      multicoloredOnly: false,
      mana: {
        'White': true,
        'Blue': true,
        'Black': true,
        'Red': true,
        'Green': true,
        'Colorless': true
      }
    }
    this._handleChangeName = this._handleChangeName.bind(this)
    this._handleChangeTypes = this._handleChangeTypes.bind(this)
    this._handleChangeText = this._handleChangeText.bind(this)
    this._handleChangeMana = this._handleChangeMana.bind(this)
    this._handleChangeConvertedManaCost = this._handleChangeConvertedManaCost.bind(this)
    this._handleChangeMonocolored = this._handleChangeMonocolored.bind(this)
    this._handleChangeMulticolored = this._handleChangeMulticolored.bind(this)
    this._toggleAll = this._toggleAll.bind(this)
    this._toggleNone = this._toggleNone.bind(this)
    this._search = this._search.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('   %cSearch componentDidUpdate()', 'color: #79BDA8;')
    this.props.onSearch(this._search(this.state))
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('   %cSearch shouldComponentUpdate()', 'color: #79BDA8;', nextState !== this.state)
    return nextState !== this.state
  }

  _handleChangeName (e) {
    this.setState({
      queryName: e.target.value
    })
  }

  _handleChangeTypes (e) {
    this.setState({
      queryTypes: e.target.value
    })
  }

  _handleChangeText (e) {
    this.setState({
      queryText: e.target.value
    })
  }

  _handleChangeMana (e) {
    this.setState({
      mana: {
        ...this.state.mana,
        [e.target.value]: e.target.checked
      }
    })
  }

  _handleChangeConvertedManaCost (e) {
    this.setState({
      convertedManaCost: parseInt(e.target.value, 10)
    })
  }

  _handleChangeMonocolored () {
    this.setState({
      monocoloredOnly: !this.state.monocoloredOnly,
      multicoloredOnly: false
    })
  }

  _handleChangeMulticolored () {
    this.setState({
      multicoloredOnly: !this.state.multicoloredOnly,
      monocoloredOnly: false
    })
  }

  _toggleAll () {
    this.setState({
      mana: {
        'White': true,
        'Blue': true,
        'Black': true,
        'Red': true,
        'Green': true,
        'Colorless': true
      }
    })
  }

  _toggleNone () {
    this.setState({
      mana: {
        'White': false,
        'Blue': false,
        'Black': false,
        'Red': false,
        'Green': false,
        'Colorless': false
      }
    })
  }

  _search (state) {
    const queryName = state.queryName.trim().toLowerCase()
    const queryTypes = state.queryTypes.trim().toLowerCase()
    const queryText = state.queryText.trim().toLowerCase()
    let manaArray = []
    for (let key in state.mana) {
      if (state.mana[key]) manaArray.push(key)
    }
    // Filter by mana if 'allowToFilterWholeCollection' is true or if name, types or text is specified
    if (this.props.allowToFilterWholeCollection || queryName.length > 0 || queryTypes.length > 0 || queryText.length > 0) {
      return this.props.collectionToSearchIn.filter(
        (card) => {
          // Hide basic lands
          if (card.supertypes && card.supertypes[0] === 'Basic') return false
          // Hide tokens
          if (card.layout === 'token') return false
          // Hide cards with no text when text is specified
          if (queryText && !card.text) return false

          const nameOk = card.name.toLowerCase().indexOf(queryName) > -1
          const typeOk = card.type.toLowerCase().indexOf(queryTypes) > -1
          const textOk = card.text ? card.text.toLowerCase().indexOf(queryText) > -1 : true
          const manaOk = card.colors ? manaArray.filter((val) => card.colors.indexOf(val) !== -1).length > 0 : this.state.mana.Colorless
          let monoOk = true
          if (this.state.monocoloredOnly && card.colors && card.colors.length !== 1) monoOk = false
          let multiOk = true
          if (this.state.multicoloredOnly && (!card.colors || (card.colors && card.colors.length < 2))) multiOk = false
          let cmcOk = false
          if (this.state.cmcType === 'minimum' && (card.cmc || 0) >= this.state.convertedManaCost) cmcOk = true
          if (this.state.cmcType === 'exactly' && (card.cmc || 0) === this.state.convertedManaCost) cmcOk = true
          if (this.state.cmcType === 'maximum' && (card.cmc || 0) <= this.state.convertedManaCost) cmcOk = true

          return nameOk && typeOk && textOk && manaOk && cmcOk && monoOk && multiOk
        }
      )
    }
  }

  render () {
    // TODO - all/none checkboxes should check state on load
    // console.log('%cSearch', 'color: #79BDA8;')
    const searchInputs = (
      <div className='search-inputs'>
        <input
          type='text'
          placeholder='Name'
          value={this.state.queryName}
          onChange={this._handleChangeName}
        />
        <input
          type='text'
          placeholder='Types'
          value={this.state.queryTypes}
          onChange={this._handleChangeTypes}
        />
        <input
          type='text'
          placeholder='Text'
          value={this.state.queryText}
          onChange={this._handleChangeText}
        />
      </div>
    )
    const manaCheckboxes = (
      <div className='mana-checkboxes'>
        <label>
          <input
            type='checkbox'
            value='White'
            checked={this.state.mana.White}
            onChange={this._handleChangeMana}
          />
          <i
            className='ms ms-cost ms-w'
            style={!this.state.mana.White ? {opacity: 0.4, backgroundColor: 'transparent'} : {}}
          />
        </label>
        <label>
          <input
            type='checkbox'
            value='Blue'
            checked={this.state.mana.Blue}
            onChange={this._handleChangeMana}
          />
          <i
            className='ms ms-cost ms-u'
            style={!this.state.mana.Blue ? {opacity: 0.4, backgroundColor: 'transparent'} : {}}
          />
        </label>
        <label>
          <input
            type='checkbox'
            value='Black'
            checked={this.state.mana.Black}
            onChange={this._handleChangeMana}
          />
          <i
            className='ms ms-cost ms-b'
            style={!this.state.mana.Black ? {opacity: 0.4, backgroundColor: 'transparent'} : {}}
          />
        </label>
        <label>
          <input
            type='checkbox'
            value='Red'
            checked={this.state.mana.Red}
            onChange={this._handleChangeMana}
          />
          <i
            className='ms ms-cost ms-r'
            style={!this.state.mana.Red ? {opacity: 0.4, backgroundColor: 'transparent'} : {}}
          />
        </label>
        <label>
          <input
            type='checkbox'
            value='Green'
            checked={this.state.mana.Green}
            onChange={this._handleChangeMana}
          />
          <i
            className='ms ms-cost ms-g'
            style={!this.state.mana.Green ? {opacity: 0.4, backgroundColor: 'transparent'} : {}}
          />
        </label>
        <label>
          <input
            type='checkbox'
            value='Colorless'
            checked={this.state.mana.Colorless}
            onChange={this._handleChangeMana}
          />
          <i
            className='ms ms-cost ms-c'
            style={!this.state.mana.Colorless ? {opacity: 0.4, backgroundColor: 'transparent'} : {}}
          />
        </label>
      </div>
    )
    const cmcInputs = (
      <div className='cmc-inputs'>
        <span>CMC</span>
        <input
          className='cmc-inputs__value-input'
          type='number'
          min='0'
          step='1'
          max='20'
          value={this.state.convertedManaCost}
          onChange={this._handleChangeConvertedManaCost}
        />
        <br />
        <label>
          <input
            className='cmc-inputs__type-input'
            type='radio'
            name='cmcType'
            value='minimum'
            checked={this.state.cmcType === 'minimum'}
            onChange={() => { this.setState({ cmcType: 'minimum' }) }}
          />
          Minimum
        </label>
        <label>
          <input
            className='cmc-inputs__type-input'
            type='radio'
            name='cmcType'
            value='exactly'
            checked={this.state.cmcType === 'exactly'}
            onChange={() => { this.setState({ cmcType: 'exactly' }) }}
          />
          Exactly
        </label>
        <label>
          <input
            className='cmc-inputs__type-input'
            type='radio'
            name='cmcType'
            value='maximum'
            checked={this.state.cmcType === 'maximum'}
            onChange={() => { this.setState({ cmcType: 'maximum' }) }}
          />
          Maximum
        </label>
      </div>
    )

    return (
      <div className='search-panel'>
        <h3>{this.props.title}</h3>
        {searchInputs}
        {manaCheckboxes}
        <div>
          <label>
            <input type='checkbox' name='monocolored' checked={this.state.monocoloredOnly} onChange={this._handleChangeMonocolored} />Monocolored only
          </label>
          <label>
            <input type='checkbox' name='multicolored' checked={this.state.multicoloredOnly} onChange={this._handleChangeMulticolored} />Multicolored only
          </label>
        </div>
        <div className='all-none-checkboxes'>
          <label>
            <input type='radio' name='allNone' value='all' onChange={this._toggleAll} />All
          </label>
          <label>
            <input type='radio' name='allNone' value='none' onChange={this._toggleNone} />None
          </label>
        </div>
        {cmcInputs}
      </div>
    )
  }
}

export default Search
