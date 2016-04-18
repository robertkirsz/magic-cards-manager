import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const mapStateToProps = (state) => ({
  collection: state.collection
})

class CollectionStats extends React.Component {
  constructor () {
    super()
    this.state = {
      databaseStatus: ''
    }
  }

  static propTypes = {
    collection: React.PropTypes.array.isRequired
  }

  render () {
    let greenCards = 0
    let redCards = 0
    let blackCards = 0
    let blueCards = 0
    let whiteCards = 0
    _.forEach(this.props.collection, (cardValue, key) => {
      _.forEach(cardValue.colors, (value, key) => {
        // Siwtch sgtatement
        if (value === 'Green') greenCards += cardValue.cardsInCollection
        if (value === 'Red') redCards += cardValue.cardsInCollection
        if (value === 'Black') blackCards += cardValue.cardsInCollection
        if (value === 'Blue') blueCards += cardValue.cardsInCollection
        if (value === 'White') whiteCards += cardValue.cardsInCollection
      })
    })
    const cardsInTotal = greenCards + redCards + blackCards + blueCards + whiteCards
    return (
      <ul>
        <li>Green: {greenCards} ({Math.round(greenCards / cardsInTotal * 100) + '%)'}</li>
        <li>Red: {redCards} ({Math.round(redCards / cardsInTotal * 100) + '%)'}</li>
        <li>Black: {blackCards} ({Math.round(blackCards / cardsInTotal * 100) + '%)'}</li>
        <li>Blue: {blueCards} ({Math.round(blueCards / cardsInTotal * 100) + '%)'}</li>
        <li>White: {whiteCards} ({Math.round(whiteCards / cardsInTotal * 100) + '%)'}</li>
      </ul>
    )
  }
}

export default connect(mapStateToProps)(CollectionStats)
