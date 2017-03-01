import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CollectionStats as StyledCollectionStats, Flex } from 'styled'
import Chart from 'chart.js'

const mapStateToProps = ({ myCards }) => ({
  collection: myCards.cards,
  collectionIsLoading: myCards.loading
})

class CollectionStats extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired,
    collectionIsLoading: PropTypes.bool.isRequired
  }

  state = {
    cardsColorsCount: {}
  }

  componentWillMount () {
    this.prepareStats(this.props.collection)
  }

  componentDidMount () {
    this.initCharts()
  }

  prepareStats = collection => {
    if (!collection.length) return

    this.createSetsChartData(collection)

    const cardsColorsCount = this.createColorsChartData(collection)

    this.setState({ cardsColorsCount })
  }

  createColorsChartData = collection => {
    // Create an array of colors for each individual card from the collection
    const colorsOfEachCard = _.flatMap(collection, card => _.times(card.cardsInCollection, () => card.colors))
    // Put them in an object and sort by color
    const cardsColorsCount = _.countBy(colorsOfEachCard)

    return cardsColorsCount
  }

  createSetsChartData = collection => {

  }

  initCharts = () => {
    const { cardsColorsCount: { White, Blue, Black, Red, Green, undefined } } = this.state

    const uniqueCardsColorsChart = new Chart('uniqueCardsColorsChart', { // eslint-disable-line
      type: 'pie',
      data: {
        labels: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless'],
        datasets: [{
          backgroundColor: ['#f0f2c0', '#b5cde3', '#aca29a', '#db8664', '#93b483', '#beb9b2'],
          data: [White, Blue, Black, Red, Green, undefined]
        }]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        }
      }
    })
  }

  render () {
    if (this.props.collectionIsLoading) return <StyledCollectionStats>Loading collection...</StyledCollectionStats>

    if (!this.props.collection.length) return <StyledCollectionStats>No cards in collection</StyledCollectionStats>

    return (
      <StyledCollectionStats>
        <h3>Collection Stats</h3>
        <Flex column>
          <figure>
            <canvas id="uniqueCardsColorsChart" width="100" height="100" />
            {/* <figcaption>Multicolored cards will make total number of above data bigger then the total number of cards</figcaption> */}
          </figure>
        </Flex>
      </StyledCollectionStats>
    )
  }
}

export default connect(mapStateToProps)(CollectionStats)
