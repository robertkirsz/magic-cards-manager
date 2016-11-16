import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
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

  componentDidMount () {
    document.body.classList.add('no-scroll')
  }

  componentWillUnmount () {
    document.body.classList.remove('no-scroll')
  }

  backgroundClick () {
    browserHistory.push(`/${this.props.routes[1].path}`)
  }

  render () {
    const { card, routes } = this.props

    if (!card) return null

    const isAllCardsPage = routes[1].path === 'all-cards'
    const isMyCardsPage = routes[1].path === 'my-cards'

    return (
      <div className="card-view" onClick={this.backgroundClick}>
        <div className="card-panel" onClick={e => e.stopPropagation()}>
          <h1>
            {card.name}
            {this.isCollectionPage && <span>&nbsp;(Total: {card.cardsInCollection})</span>}
          </h1>
          <div className="card-variants-list">
            {card.variants.map((variantCard) => (
              <Card
                key={variantCard.id}
                mainCard={card}
                variantCard={variantCard}
                setIcon
                showCount={this.isCollectionPage}
                showAdd
                showRemove={isMyCardsPage}
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

export default connect(mapStateToProps)(CardView)
