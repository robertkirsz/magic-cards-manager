import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Row, Col, Modal } from 'react-bootstrap'
import _find from 'lodash/find'
import { Card, CardDetails } from 'components'
import { cardsDatabase } from 'database'

const mapStateToProps = ({ allCards, myCards, settings }, ownProps) => ({
  myCardsLocked: myCards.locked,
  cardModalAnimation: settings.cardModalAnimation,
  // Find card by its name from the URL in all the cards or cards
  // from user's collection based of what page we are on
  card: _find(
    ownProps.routes[1].path === 'my-cards'
      ? myCards.cards
      : cardsDatabase,
    { cardUrl: ownProps.routeParams.cardUrl }
  )
})

class CardView extends Component {
  static propTypes = {
    card: PropTypes.object,
    routes: PropTypes.array,
    routeParams: PropTypes.object,
    addCard: PropTypes.func,
    myCardsLocked: PropTypes.bool,
    cardModalAnimation: PropTypes.bool
  }

  state = { modalOpened: true }

  isCollectionPage = this.props.routes[1].path === 'my-cards'

  closeModal = () => {
    // Hide modal
    this.setState({ modalOpened: false })
    // Go back, if animation is disabled (because normally we go back
    // when exit animation finishes)
    if (!this.props.cardModalAnimation) this.goBack()
  }

  goBack = () => {
    browserHistory.push(`/${this.props.routes[1].path}`)
  }

  render () {
    const { card, routes, myCardsLocked, cardModalAnimation } = this.props
    const { modalOpened } = this.state

    if (!card) return null

    const isMyCardsPage = routes[1].path === 'my-cards'

    return (
      <Modal
        className="card-view"
        animation={cardModalAnimation}
        show={modalOpened} // Value is from state and is "true" by default
        bsSize="large"
        onExited={this.goBack} // Go back when exit animation finishes
        onHide={this.closeModal} // Close modal on clicking "X" icon or clicking on backdrop
      >
        <Modal.Header closeButton>
          <Modal.Title>{card.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <div className="card-picture">
                <Card
                  mainCard={card}
                  hoverAnimation
                />
                {this.isCollectionPage && <span>&nbsp;(Total: {card.cardsInCollection})</span>}
              </div>
            </Col>
            <Col xs={8}>
              <CardDetails card={card} />
            </Col>
          </Row>
          <div className="card-variants-list">
            {
              card.variants.map(variantCard => (
                <Card
                  className="small"
                  key={variantCard.id}
                  mainCard={card}
                  variantCard={variantCard}
                  setIcon
                  showCount={this.isCollectionPage}
                  showAdd={!myCardsLocked}
                  showRemove={!myCardsLocked && isMyCardsPage}
                />
              ))
            }
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default connect(mapStateToProps)(CardView)
