import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

export class CardView extends Component {
  static propTypes = {
    card: PropTypes.object,
    routeParams: PropTypes.object
  }

  backgroundClick () {
    browserHistory.push(`/cards`)
  }

  render () {
    const { card = {} } = this.props

    return (
      <div className="card-view" onClick={this.backgroundClick}>
        <div className="card-panel" onClick={(e) => e.stopPropagation()}>
          <h1>{card.name}</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ allCards }, ownProps) => ({
  card: _.find(allCards.cards, { id: ownProps.routeParams.id })
})

export default connect(mapStateToProps)(CardView)
