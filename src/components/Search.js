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
    this._toggleAll = this._toggleAll.bind(this)
    this._toggleNone = this._toggleNone.bind(this)
    this._search = this._search.bind(this)
  }

  // componentWillUpdate (nextProps, nextState) {
  //   console.log('   %cSearch componentWillUpdate()', 'color: #79BDA8;')
  //   console.log('nextState === this.state', nextState === this.state)
  //   this.props.onSearch(this._search(nextState))
  // }

  componentDidUpdate (prevProps, prevState) {
    console.log('   %cSearch componentDidUpdate()', 'color: #79BDA8;')
    this.props.onSearch(this._search(this.state))
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('   %cSearch shouldComponentUpdate()', 'color: #79BDA8;', nextState !== this.state)
    return nextState !== this.state
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
        (card) =>
          card.name.toLowerCase().indexOf(queryName) > -1 &&
          card.type.toLowerCase().indexOf(queryTypes) > -1 &&
          (card.text ? card.text.toLowerCase().indexOf(queryText) > -1 : true) &&
          (card.colors ? manaArray.filter((val) => card.colors.indexOf(val) !== -1).length : true)
      )
    }
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

  _toggleAll () {
    this.setState({
      mana: {
        'White': true,
        'Blue': true,
        'Black': true,
        'Red': true,
        'Green': true
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
        'Green': false
      }
    })
  }

  render () {
    console.log('%cSearch', 'color: #79BDA8;')

    return (
      <div className='search-panel'>
        <h3>{this.props.title}</h3>
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
        <div className='all-none-checkboxes'>
          <label>
            <input type='radio' name='allNone' value='all' onChange={this._toggleAll} />All
          </label>
          <label>
            <input type='radio' name='allNone' value='none' onChange={this._toggleNone} />None
          </label>
        </div>
        {/* <div>
          <select className='form-control'>
            <option value=''>Card Type:</option>
            <option value='Artifact'>Artifact</option>
            <option value='Basic'>Basic</option>
            <option value='Conspiracy'>Conspiracy</option>
            <option value='Creature'>Creature</option>
            <option value='Enchantment'>Enchantment</option>
            <option value='Instant'>Instant</option>
            <option value='Land'>Land</option>
            <option value='Legendary'>Legendary</option>
            <option value='Ongoing'>Ongoing</option>
            <option value='Phenomenon'>Phenomenon</option>
            <option value='Plane'>Plane</option>
            <option value='Planeswalker'>Planeswalker</option>
            <option value='Scheme'>Scheme</option>
            <option value='Snow'>Snow</option>
            <option value='Sorcery'>Sorcery</option>
            <option value='Tribal'>Tribal</option>
            <option value='Vanguard'>Vanguard</option>
            <option value='World'>World</option>
          </select>
        </div> */}
      </div>
    )
  }
}

export default Search
