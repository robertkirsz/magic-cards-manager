import React from 'react'
import _ from 'lodash'
import { ManaCost, bracketsToArray } from 'utils'

const CardName = ({ card, onCardClick, collection }) => {
  // Jeśli karta ma 'manaCost', zbierz ją do tablicy
  const manaCostArray = (card.manaCost !== undefined) ? bracketsToArray(card.manaCost) : card.manaCost
  // Na podstawie tablicy wygeneruj ikony many
  const manaCost = (card.manaCost !== undefined) ? <ManaCost manaArray={manaCostArray} /> : null
  const landIcon = card.types && card.types[0] === 'Land' ? <i className='ms ms-land' /> : null
  const artifactIcon = card.types && card.types[0] === 'Artifact' ? <i className='ms ms-artifact' /> : null
  const inCollection = _.find(collection, { 'name': card.name })

  return (
    <li
      className={'search-results__list__item' + (inCollection ? ' search-results__list__item--owned' : '')}
      onClick={() => { onCardClick(card) }}
    >
      {landIcon}{artifactIcon}{card.name}{manaCost}
    </li>
  )
}

class CardNamesList extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array,
    collection: React.PropTypes.array,
    onCardClick: React.PropTypes.func,
    moreCardsToShow: React.PropTypes.bool,
    onMoreClick: React.PropTypes.func
  }

  render () {
    const { cards, collection, onCardClick, moreCardsToShow, onMoreClick } = this.props
    return (
      <div className='search-results'>
        <h3 className='search-results__h3'>Search results</h3>
        <div className='search-results__list-wrapper'>
          <ul className='search-results__list'>
            {
              cards.map((card, i) =>
                <CardName
                  key={i}
                  card={card}
                  collection={collection}
                  onCardClick={onCardClick}
                />)
            }
            {moreCardsToShow ? <li onClick={onMoreClick}>+ Show more</li> : null}
          </ul>
        </div>
      </div>
    )
  }
}

export default CardNamesList
