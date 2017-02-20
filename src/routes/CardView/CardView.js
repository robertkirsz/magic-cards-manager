import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Row, Col, Modal } from 'react-bootstrap'
import _find from 'lodash/find'
import { Card, CardDetails } from 'components'
import { cardsDatabase } from 'database'

const mapStateToProps = ({ allCards, myCards }, ownProps) => ({
  myCardsLocked: myCards.locked,
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
    myCardsLocked: PropTypes.bool
  }

  state = {
    modalOpened: true
  }

  isCollectionPage = this.props.routes[1].path === 'my-cards'

  closeModal = () => {
    this.setState({ modalOpened: false })
  }

  goBack = () => {
    browserHistory.push(`/${this.props.routes[1].path}`)
  }

  render () {
    const { card, routes, myCardsLocked } = this.props
    const { modalOpened } = this.state

    if (!card) return null

    const isMyCardsPage = routes[1].path === 'my-cards'

    return (
      <Modal
        className="card-view"
        show={modalOpened}
        bsSize="large"
        onExited={this.goBack}
        onHide={this.closeModal}
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
