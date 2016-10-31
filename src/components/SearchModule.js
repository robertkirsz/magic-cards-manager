import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { filterCards } from 'store/allCards'
import ColorFilter from 'components/ColorFilter'
import _ from 'lodash'

export class SearchModule extends Component {
  static propTypes = {
    cards: PropTypes.array,
    filterCards: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.searchCards = this.searchCards.bind(this)
  }

  searchCards (e) {
    if (!e.target.value) {
      this.props.filterCards(null)
      return
    }

    const filteredCards = _.filter(this.props.cards, (card) => {
      const nameOk = card.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      return nameOk
    })

    this.props.filterCards(filteredCards)
  }

  render () {
    return (
      <div className="search-module row">
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            onChange={this.searchCards}
            placeholder="Card name"
            />
        </div>
        <ColorFilter />
      </div>
    )
  }
}

const mapDispatchToProps = { filterCards }

const mapStateToProps = ({ allCards }) => ({ cards: allCards.cards })

export default connect(mapStateToProps, mapDispatchToProps)(SearchModule)
