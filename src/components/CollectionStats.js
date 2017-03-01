import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CollectionStats as StyledCollectionStats, Flex } from 'styled'
import Chart from 'chart.js'

const mapStateToProps = ({ myCards, allCards }) => ({
  collection: myCards.cards,
  cardSets: allCards.cardSets
})

class CollectionStats extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired,
    cardSets: PropTypes.array.isRequired
  }

  state = {
    cardsColorsCount: {},
    setNamesCount: {}
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
    const setNamesCount = this.createSetsChartData(collection)

    this.setState({ cardsColorsCount, setNamesCount })
  }

  createColorsChartData = collection => {
    // Create an array of colors for each individual card from the collection
    const colorsOfEachCard = _.flatMap(collection, card => _.times(card.cardsInCollection, () => card.colors))
    // Put them in an object and sort by color
    return _.countBy(colorsOfEachCard)
  }

  createSetsChartData = collection => {
    // Create an array of sets for each individual card from the collection
    const setCodesOfEachCard = _.flatMapDeep(collection, card => (
      _.map(card.variants, card => _.times(card.cardsInCollection, () => card.setCode))
    ))
    // Put them in an object and sort by color
    const setCodesCount = _.countBy(setCodesOfEachCard)
    const setNamesCount = {}
    _.forEach(setCodesCount, (count, code) => {
      const setName = _.find(this.props.cardSets, { code }).name
      setNamesCount[setName] = count
    })
    console.warn('setCodesCount', setCodesCount, 'setNamesCount', setNamesCount)
    return setNamesCount
  }

  initCharts = () => {
    const { cardsColorsCount: { White, Blue, Black, Red, Green, undefined } } = this.state

    const cardsColorsChart = new Chart('cardsColorsChart', { // eslint-disable-line
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

    const { setNamesCount } = this.state
    const cardsSetsChartLabels = []
    const cardsSetsChartData = []
    _.forEach(setNamesCount, (count, name) => {
      cardsSetsChartLabels.push(name)
      cardsSetsChartData.push(count)
    })

    const cardsSetsChart = new Chart('cardsSetsChart', { // eslint-disable-line
      type: 'bar',
      data: {
        labels: cardsSetsChartLabels,
        datasets: [
          {
            data: cardsSetsChartData
          }
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    })
  }

  render () {
    if (!this.props.collection.length) return <StyledCollectionStats>No cards in collection</StyledCollectionStats>

    return (
      <StyledCollectionStats>
        <h3>Collection Stats</h3>
        <Flex column>
          <figure>
            <canvas id="cardsColorsChart" width="150" height="150" />
            {/* <figcaption>Multicolored cards will make total number of above data bigger then the total number of cards</figcaption> */}
          </figure>
          <figure>
            <canvas id="cardsSetsChart" width="500" height="250" />
          </figure>
        </Flex>
      </StyledCollectionStats>
    )
  }
}

export default connect(mapStateToProps)(CollectionStats)
