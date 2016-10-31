import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addCard } from 'store/myCards'
import { Card } from 'components'

export class CardView extends Component {
  static propTypes = {
    card: PropTypes.object,
    routeParams: PropTypes.object,
    addCard: PropTypes.func
  }

  backgroundClick () {
    browserHistory.push(`/cards`)
  }

  render () {
    const { card = {} } = this.props

    return (
      <div className="card-view" onClick={this.backgroundClick}>
        <div className="card-panel" onClick={e => e.stopPropagation()}>
          <h1>{card.name}</h1>
          <Card card={card} />
          <div className="card-variants-list">
            {(card.variants || []).map(card => (
              <Card
                key={card.id}
                card={card}
                onClick={() => { this.props.addCard(card) }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ allCards }, ownProps) => ({
  card: _.find(allCards.cards, { cardUrl: ownProps.routeParams.cardUrl })
})

const mapDispatchToProps = {
  addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView)
