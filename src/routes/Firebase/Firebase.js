import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ItemForm from './ItemForm'
import _ from 'lodash'
import { database, firebaseSetData, firebasePushData, firebaseUpdateData } from 'utils/firebase'

const itemsRef = database.ref('items')

export class Firebase extends Component {
  static propTypes = {
    headerHeight: PropTypes.number
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

  async setItem (data) {
    const result = await firebaseSetData('items', data.id, data)
    console.log('set', result)
  }

  async pushItem (data) {
    const result = await firebasePushData('items', data)
    console.log('push', result)
  }

  async updateItem (data) {
    const result = await firebaseUpdateData('items', data.id, data)
    console.log('update', result)
  }

  addUsersDatabaseListener () {
    itemsRef.on('value', (snapshot) => {
      const items = _.map(snapshot.val(), (items, key) => ({ ...items, key }))
      this.setState({ items })
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

const mapStateToProps = ({ layout }) => ({ headerHeight: layout.headerHeight })

export default connect(mapStateToProps)(Firebase)
