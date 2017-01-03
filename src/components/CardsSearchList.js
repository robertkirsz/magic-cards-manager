import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'components'
import cardHoverEffect from 'utils/cardHoverEffect'
import _ from 'lodash'

class CardsSearchList extends React.Component {
  componentDidMount () {
    cardHoverEffect()
  }

  render () {
    return (
      <div className="cards-search-list" style={{ marginTop: this.props.headerHeight + 10 }}>
        {
          _.map(this.props.cards, (card) => (
            <Card
              key={card.id}
              mainCard={card}
              onClick={() => { browserHistory.push(`/${this.props.path}/${card.cardUrl}`) }}
            />
          ))
        }
      </div>
    )
  }
}

CardsSearchList.propTypes = {
  cards: PropTypes.array,
  path: PropTypes.string,
  addCard: PropTypes.func,
  headerHeight: PropTypes.number
}

const mapStateToProps = ({ layout }) => ({ headerHeight: layout.headerHeight })

export default connect(mapStateToProps)(CardsSearchList)
