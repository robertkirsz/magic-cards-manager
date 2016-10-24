import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CardsSearchList } from 'components'
import _ from 'lodash'
import './AllCardsView.scss'

export class AllCardsView extends Component {
  static propTypes = {
    allCards: PropTypes.object,
    children: PropTypes.element
  }

  render () {
    const {
      allCards: { cards, filteredCards, error }
    } = this.props

    const errorBox = (
      <div className="alert alert-danger">
        <strong>Oh snap!</strong>
        {error}
      </div>
    )

    return (
      <div className="all-cards-view">
        {this.props.children}
        {error && errorBox}
        <CardsSearchList cards={_.slice(filteredCards || cards, 0, 30)} />
      </div>
    )
  }
}

const mapStateToProps = ({ allCards }) => ({ allCards })

export default connect(mapStateToProps)(AllCardsView)
