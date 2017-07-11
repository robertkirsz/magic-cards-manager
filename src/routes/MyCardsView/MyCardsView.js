import React, { Component } from 'react'
import PropTypes from 'proptypes'
import { connect } from 'react-redux'
import { CardsSearchList } from 'components'

const mapStateToProps = ({ myCards }) => ({ myCards })

class MyCardsView extends Component {
  static propTypes = {
    myCards: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  render () {
    const {
      myCards: { cards, filteredCards },
      children
    } = this.props

    if (!cards.length) {
      return (
        <div className="my-cards-view">
          {children}
          <h1 className="my-cards-view__login-prompt">
            No cards in collection
          </h1>
        </div>
      )
    }

    return (
      <div className="my-cards-view">
        {children}
        <CardsSearchList
          path="my-cards"
          cards={filteredCards || cards}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyCardsView)
