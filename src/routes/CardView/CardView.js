import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Row, Col, Modal } from 'react-bootstrap'
import _ from 'lodash'
import { Card } from 'components'
import { cardsDatabase } from 'database'

const mapStateToProps = ({ allCards, myCards }, ownProps) => ({
  // Find card by its name from the URL in all the cards or cards
  // from user's collection based of what page we are on
  card: _.find(
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
    addCard: PropTypes.func
  }

  state = {
    modalOpened: true
  }

  isCollectionPage = this.props.routes[1].path === 'my-cards'

  componentDidMount () {
    // document.body.classList.add('no-scroll')
  }

  componentWillUnmount () {
    // document.body.classList.remove('no-scroll')
  }

  closeModal = () => {
    this.setState({ modalOpened: false })
    browserHistory.push(`/${this.props.routes[1].path}`)
  }

  render () {
    const { card, routes } = this.props
    const { modalOpened } = this.state

    if (!card) return null

    // const isAllCardsPage = routes[1].path === 'all-cards'
    const isMyCardsPage = routes[1].path === 'my-cards'

    return (
      <Modal
        className="card-view"
        show={modalOpened}
        onHide={this.closeModal}
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>{card.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <div className="card-info">
                <Card mainCard={card} hoverAnimation />
                {this.isCollectionPage && <span>&nbsp;(Total: {card.cardsInCollection})</span>}
              </div>
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
                  showAdd
                  showRemove={isMyCardsPage}
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
