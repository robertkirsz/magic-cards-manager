import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCards } from 'store/allCards'
import _ from 'lodash'
import './AllCardsView.scss'

export class AllCardsView extends Component {
  static propTypes = {
    allCards: PropTypes.object,
    getCards: PropTypes.func
  }

  render () {
    return (
      <div>
        <h2>AllCardsView</h2>
        <button className="btn" onClick={this.props.getCards}>Get</button>
        {this.props.allCards.fetching ? <h4>Loading...</h4> : null}
        {this.props.allCards.error ? <h4>{this.props.allCards.error}</h4> : null}
        <h4>Latest set: {_.get(this.props.allCards, 'latestSet.name', '...')}</h4>
        <h4>Size: {this.props.allCards.cardsNumber}</h4>
      </div>
    )
  }
}

const mapDispatchToProps = { getCards }

const mapStateToProps = ({ allCards }) => ({ allCards })

export default connect(mapStateToProps, mapDispatchToProps)(AllCardsView)
