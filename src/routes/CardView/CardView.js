import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addCard } from 'store/myCards'
import { Card } from 'components'

export class CardView extends Component {
  static propTypes = {
    card: PropTypes.object,
    routes: PropTypes.array,
    routeParams: PropTypes.object,
    addCard: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.isCollectionPage = props.routes[1].path === 'my-cards'

    this.backgroundClick = this.backgroundClick.bind(this)
  }

  backgroundClick () {
    browserHistory.push(`/${this.props.routes[1].path}`)
  }

  render () {
    const { card, addCard } = this.props

    if (!card) return null

    return (
      <div className="card-view" onClick={this.backgroundClick}>
        <div className="card-panel" onClick={e => e.stopPropagation()}>
          <h1>
            {card.name}
            {this.isCollectionPage && <span>&nbsp;(Total: {card.cardsInCollection})</span>}
          </h1>
          <div className="card-variants-list">
            {card.variants.map((variant) => (
              <Card
                key={variant.id}
                card={variant}
                onClick={() => { addCard(card, variant) }}
                setIcon
                showCount={this.isCollectionPage}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ allCards, myCards }, ownProps) => ({
  // Find card by its name from the URL in all the cards or cards
  // from user's collection based of what page we are on
  card: _.find(
    ownProps.routes[1].path === 'my-cards'
      ? myCards.cards
      : allCards.cards,
    { cardUrl: ownProps.routeParams.cardUrl }
  )
})

const mapDispatchToProps = { addCard }

export default connect(mapStateToProps, mapDispatchToProps)(CardView)
