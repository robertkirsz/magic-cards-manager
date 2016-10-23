import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCards } from 'store/allCards'
import { CardsSearchList } from 'components'
import _ from 'lodash'
import './AllCardsView.scss'

export class AllCardsView extends Component {
  static propTypes = {
    allCards: PropTypes.object,
    getCards: PropTypes.func
  }

  render () {
    const {
      allCards,
      allCards: { fetching, error },
      getCards
    } = this.props

    const errorBox = (
      <div className="alert alert-danger">
        <strong>Oh snap!</strong>
        {error}
      </div>
    )

    return (
      <div className="all-cards-view">
        <button
          className="btn"
          onClick={getCards}
        >
          {fetching ? 'Loading...' : 'Get all cards'}
        </button>
        {error && errorBox}
        <CardsSearchList cards={_.slice(_.map(allCards.cards), 0, 15)} />
      </div>
    )
  }
}

const mapDispatchToProps = { getCards }

const mapStateToProps = ({ allCards }) => ({ allCards })

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsView)
