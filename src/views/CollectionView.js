import React from 'react'
import { connect } from 'react-redux'
import { actions as collectionActions } from '../redux/modules/collection'
import CardsList from 'components/CardsList'
import CollectionStats from 'components/CollectionStats'

const mapStateToProps = (state) => ({
  collection: state.collection
})

class CollectionView extends React.Component {
  constructor () {
    super()
    this.state = {
      outputStyle: 'text',
      queryName: '',
      queryTypes: '',
      queryText: '',
      mana: {
        'White': true,
        'Blue': true,
        'Black': true,
        'Red': true,
        'Green': true
      },
      cardsToDisplay: 30,
      cardArtworks: [],
      allCards: [],
      allSetsArray: []
    }
    this._deleteCardFromCollection = this._deleteCardFromCollection.bind(this)
    this._changeOutput = this._changeOutput.bind(this)
    this._handleChangeName = this._handleChangeName.bind(this)
    this._handleChangeTypes = this._handleChangeTypes.bind(this)
    this._handleChangeText = this._handleChangeText.bind(this)
    this._handleChangeMana = this._handleChangeMana.bind(this)
    this._toggleAll = this._toggleAll.bind(this)
    this._toggleNone = this._toggleNone.bind(this)
  }

  static propTypes = {
    collection: React.PropTypes.array.isRequired,
    addCard: React.PropTypes.func.isRequired,
    removeCard: React.PropTypes.func.isRequired
  }

  _deleteCardFromCollection (card) {
    this.props.removeCard(card)
  }

  _changeOutput (output) {
    this.setState({outputStyle: output})
  }

  _handleChangeName (e) {
    this.setState({
      queryName: e.target.value,
      cardArtworks: []
    })
  }

  _handleChangeTypes (e) {
    this.setState({
      queryTypes: e.target.value,
      cardArtworks: []
    })
  }

  _handleChangeText (e) {
    this.setState({
      queryText: e.target.value,
      cardArtworks: []
    })
  }

  _handleChangeMana (e) {
    // this.state.mana[e.target.value] = e.target.checked
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
    let cards = this.props.collection
    let manaArray = []
    for (let key in this.state.mana) {
      if (this.state.mana[key]) manaArray.push(key)
    }
    const queryName = this.state.queryName.trim().toLowerCase()
    const queryTypes = this.state.queryTypes.trim().toLowerCase()
    const queryText = this.state.queryText.trim().toLowerCase()
    if (this.props.collection.length && (queryName.length > 0 || queryTypes.length > 0 || queryText.length > 0)) {
      // cards = cardsDatabase.cards.filter(
      cards = this.props.collection.filter(
        card =>
          card.name.toLowerCase().indexOf(queryName) > -1 &&
          card.type.toLowerCase().indexOf(queryTypes) > -1 &&
          (card.text ? card.text.toLowerCase().indexOf(queryText) > -1 : false) &&
          (card.colors ? manaArray.filter(val => card.colors.indexOf(val) !== -1).length : true)
      ).slice(0, this.state.cardsToDisplay + 1)
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div id='searchForm' className='col-md-3'>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Name' value={this.state.queryName} onChange={this._handleChangeName} />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Types' value={this.state.queryTypes} onChange={this._handleChangeTypes} />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Text' value={this.state.queryText} onChange={this._handleChangeText} />
            </div>
            <div className='form-group manaCheckboxes'>
              <label className='checkbox-inline'>
                <input type='checkbox' value='White' checked={this.state.mana.White} onChange={this._handleChangeMana} />
                <i className={this.state.mana.White ? 'mtg white' : 'mtg plains'} style={!this.state.mana.White ? {opacity: 0.4} : {}}></i>
              </label>
              <label className='checkbox-inline'>
                <input type='checkbox' value='Blue' checked={this.state.mana.Blue} onChange={this._handleChangeMana} />
                <i className={this.state.mana.Blue ? 'mtg blue' : 'mtg island'} style={!this.state.mana.Blue ? {opacity: 0.4} : {}}></i>
              </label>
              <label className='checkbox-inline'>
                <input type='checkbox' value='Black' checked={this.state.mana.Black} onChange={this._handleChangeMana} />
                <i className={this.state.mana.Black ? 'mtg black' : 'mtg swamp'} style={!this.state.mana.Black ? {opacity: 0.4} : {}}></i>
              </label>
              <label className='checkbox-inline'>
                <input type='checkbox' value='Red' checked={this.state.mana.Red} onChange={this._handleChangeMana} />
                <i className={this.state.mana.Red ? 'mtg red' : 'mtg mountain'} style={!this.state.mana.Red ? {opacity: 0.4} : {}}></i>
              </label>
              <label className='checkbox-inline'>
                <input type='checkbox' value='Green' checked={this.state.mana.Green} onChange={this._handleChangeMana} />
                <i className={this.state.mana.Green ? 'mtg green' : 'mtg forest'} style={!this.state.mana.Green ? {opacity: 0.4} : {}}></i>
              </label>
              <br />
              <label className='radio-inline'>
                <input type='radio' name='allNone' value='all' onChange={this._toggleAll} />All
              </label>
              <label className='radio-inline'>
                <input type='radio' name='allNone' value='none' onChange={this._toggleNone} />None
              </label>
            </div>
            <div className='form-group'>
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
            </div>
          </div>
          <CollectionStats />
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <CardsList cards={cards} outputStyle='picture' onCardClick={this._deleteCardFromCollection} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, collectionActions)(CollectionView)
