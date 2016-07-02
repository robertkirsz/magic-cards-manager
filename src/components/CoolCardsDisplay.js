import React, { Component, PropTypes } from 'react'
import { getRandom } from 'utils'

const Card = ({ card }) => {
  return (
    <div
      className='cool-cards-display__cards__card'
      style={{
        WebkitTransform: 'rotate(' + getRandom(-180, 180) + 'deg)',
        MozTransform: 'rotate(' + getRandom(-180, 180) + 'deg)',
        backgroundImage: 'url(http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' + card.multiverseid + ')',
        top: getRandom(-250, 250),
        left: getRandom(-250, 250),
        transitionDuration: getRandom(0.5, 0.9) + 's'
      }}
    />
  )
}

class CoolCardsDisplay extends Component {
  static propTypes = {
    cards: PropTypes.array,
    onClick: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      cardsInOrder: false,
      cardsHidden: true
    }
    this._foo = this._foo.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ cardsHidden: false })
    }, 1000)
  }

  _foo () {
    this.setState({ cardsInOrder: !this.state.cardsInOrder })
    setTimeout(() => {
      this.props.onClick()
    }, 1000)
  }

  render () {
    return (
      <div className={
          'cool-cards-display' +
          (this.state.cardsInOrder ? ' cool-cards-display--cards-in-order' : '') +
          (this.state.cardsHidden ? ' cool-cards-display--hidden' : '')
        }
        onClick={this._foo}
      >
        <div className='cool-cards-display__cards'>
          {this.props.cards.map((card, i) => <Card key={i} card={card} />)}
        </div>
      </div>
    )
  }
}

export default CoolCardsDisplay
