import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CardsSearchList } from 'components'

export class AllCardsView extends Component {
  static propTypes = {
    allCards: PropTypes.object,
    children: PropTypes.element
  }

  render () {
    const {
      allCards: { cards, filteredCards, error },
      children
    } = this.props

    const errorBox = (
      <div className="alert alert-danger">
        <strong>Oh snap!</strong>
        {error}
      </div>
    )

    return (
      <div className="all-cards-view">
        {children}
        {error && errorBox}
        <CardsSearchList
          path="all-cards"
          cards={_.slice(filteredCards || cards, 0, 30)}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ allCards }) => ({ allCards })

export default connect(mapStateToProps)(AllCardsView)
