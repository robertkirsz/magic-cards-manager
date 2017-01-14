import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { database } from 'utils/firebase'
import ItemForm from './ItemForm'
import _ from 'lodash'

const itemsRef = database.ref('items')
const allCardsRef = database.ref('AllCards')

export class Firebase extends Component {
  static propTypes = {
    headerHeight: PropTypes.number,
    allCards: PropTypes.object
  }

  constructor () {
    super()

    this.setItem = this.setItem.bind(this)
    this.pushItem = this.pushItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.uploadCards = this.uploadCards.bind(this)

    this.state = {
      errorMessage: '',
      items: []
    }
  }

  componentDidMount () {
    this.addUsersDatabaseListener()
  }

  setItem ({ id, name }) {
    itemsRef
      .child(id)
      .set({ id, name }, (error) => {
        if (error) console.error('Error ->', error)
        else console.info('Data set')
      })
  }

  pushItem ({ id, name }) {
    itemsRef
      .push()
      .set({ id, name }, (error) => {
        if (error) console.error('Error ->', error)
        else console.info('Data pushed')
      })
  }

  updateItem ({ id, name }) {
    itemsRef
      .child(id)
      .update({ id, name }, (error) => {
        if (error) console.error('Error ->', error)
        else console.info('Data pushed')
      })
  }

  addUsersDatabaseListener () {
    itemsRef.on('value', (snapshot) => {
      const items = _.map(snapshot.val(), (items, key) => ({ ...items, key }))
      this.setState({ items })
    })
  }

  uploadCards () {
    const cards = this.props.allCards.cards.splice(0, 30)

    _.forEach(cards, (card) => {
      allCardsRef
        .child(card.multiverseid)
        .set(card, (error) => {
          if (error) console.error('Error ->', error)
          else console.info('Data set for', card.multiverseid)
        })
    })
  }

  getCards () {
    allCardsRef
      .orderByChild('name')
      .once('value', (snapshot) => {
        console.log('cards', snapshot.val())
      })
  }

  render () {
    return (
      <div style={{ fontSize: '0.75em', marginTop: this.props.headerHeight + 20 }}>
        <h1>Firebase <small style={{ color: 'red' }}>{this.state.errorMessage}</small></h1>
        <ItemForm onSubmit={this.setItem} buttonLabel="Set" />
        <ItemForm onSubmit={this.pushItem} buttonLabel="Push" />
        <ItemForm onSubmit={this.updateItem} buttonLabel="Update" />
        <div>
          <button onClick={this.uploadCards}>Upload</button>
        </div>
        <div>
          <button onClick={this.getCards}>Get cards</button>
        </div>
        <div>
          <ul>
            {
              this.state.items.map(({ key, name }) => <li key={key}>{name}</li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ layout, allCards }) => ({ headerHeight: layout.headerHeight, allCards })

export default connect(mapStateToProps)(Firebase)
