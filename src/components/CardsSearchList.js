import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Card } from 'components'
import _ from 'lodash'

export const CardsSearchList = (props) => {
  return (
    <div className="cards-search-list" style={{ marginTop: props.headerHeight + 10 }}>
      {_.map(props.cards, (card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => { browserHistory.push(`/cards/${card.cardUrl}`) }}
        />
      ))}
    </div>
  )
}

CardsSearchList.propTypes = {
  cards: PropTypes.array,
  addCard: PropTypes.func,
  headerHeight: PropTypes.number
}

const mapStateToProps = ({ layout }) => ({ headerHeight: layout.headerHeight })

export default connect(mapStateToProps)(CardsSearchList)
