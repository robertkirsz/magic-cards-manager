import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CardsSearchList } from 'components'

export class MyCardsView extends Component {
  static propTypes = {
    myCards: PropTypes.object,
    children: PropTypes.element
  }

  render () {
    const {
      myCards: { cards, filteredCards },
      children
    } = this.props

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

const mapStateToProps = ({ myCards }) => ({ myCards })

export default connect(mapStateToProps)(MyCardsView)
