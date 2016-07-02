import React from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'

const mapStateToProps = (state) => ({
  application: state.application
})

class CardsList extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array,
    addCard: React.PropTypes.func,
    removeCard: React.PropTypes.func,
    onAddClick: React.PropTypes.func,
    onRemoveClick: React.PropTypes.func,
    openModal: React.PropTypes.func,
    application: React.PropTypes.object,
    addCardToDeck: React.PropTypes.func
  }

  // key={card.id + '' + i} pozwala na wyświetlanie duplikatów
  // Zrobić żeby przy outputStyle == picture nie renderował opisu zamiast tylko go ukrywać w css
  render () {
    const { addCard, removeCard, application, openModal, addCardToDeck } = this.props

    return (
      <div className='cardList'>
        {
          this.props.cards.map((card, i) => (
            <Card
              key={card.id + '' + i}
              card={card}
              openModal={openModal}
              showControls={!application.locked}
              addCardToCollection={function () { addCard(card) }}
              removeCardFromCollection={function () { removeCard(card) }}
              addCardToDeck={function () { addCardToDeck(card.name) }}
              showAddToDeckButton={application.activeDeck !== null}
            />
          ))
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(CardsList)
