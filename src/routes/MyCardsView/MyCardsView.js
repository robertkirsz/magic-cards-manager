import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
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

    if (!user.loggedIn) {
      return (
        <div style={{ marginTop: '25vh' }}>
          <h1>Log in to be able to save your collection</h1>
        </div>
      )
    }

    return (
      <div className="all-cards-view">
        {children}
        <CardsSearchList
          path="my-cards"
          cards={_.slice(filteredCards || cards, 0, 30)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyCardsView)
