import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CardsSearchList } from 'components'

const mapStateToProps = ({ user, myCards }) => ({ user, myCards })

export class MyCardsView extends Component {
  static propTypes = {
    user: PropTypes.object,
    myCards: PropTypes.object,
    children: PropTypes.element
  }

  render () {
    const {
      myCards: { cards, filteredCards },
      children,
      user
    } = this.props

    if (!user.signedIn) {
      return (
        <div className="my-cards-view">
          <h1 className="my-cards-view__login-prompt">
            Log in to be able to save your collection
          </h1>
        </div>
      )
    }

    if (!cards.length) {
      return (
        <div className="my-cards-view">
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
