import React, { Component } from 'react'
import PropTypes from 'proptypes'
import { connect } from 'react-redux'
import { cardsDatabase } from 'database'
import { CardsSearchList } from 'components'

class AllCardsView extends Component {
  static propTypes = {
    allCards: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  render () {
    const { allCards: { filteredCards }, children } = this.props

    return (
      <div className="all-cards-view">
        {children}
        <CardsSearchList
          path="all-cards"
          cards={filteredCards || cardsDatabase}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ allCards }) => ({ allCards })

export default connect(mapStateToProps)(AllCardsView)
