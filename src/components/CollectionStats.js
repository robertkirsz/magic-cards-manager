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
    cardColorsCount: {},
    setNamesCount: {},
    cardTypesCount: {},
    creatureTypesCount: {}
  }

  componentWillMount () {
    this.prepareStats(this.props.collection)
  }

  componentDidMount () {
    this.initCharts()
  }

  prepareStats = collection => {
    if (!collection.length) return

    const cardColorsCount = this.createColorsChartData(collection)
    const setNamesCount = this.createSetsChartData(collection)
    const cardTypesCount = this.createTypesChartData(collection)
    const creatureTypesCount = this.createCreatureTypesChartData(collection)

    this.setState({ cardColorsCount, setNamesCount, cardTypesCount, creatureTypesCount })
  }

  // Prepares data for colors pie chart
  createColorsChartData = collection => {
    // Create an array of colors for each individual card from the collection
    const colorsOfEachCard = _.flatMap(collection, card => _.times(card.cardsInCollection, () => card.colors))
    // Put them in an object and count by color
    return _.countBy(colorsOfEachCard)
  }

  // Prepares data for sets bar chart
  createSetsChartData = collection => {
    // Create an array of sets for each individual card from the collection
    const setCodesOfEachCard = _.flatMapDeep(collection, card => (
      _.map(card.variants, card => _.times(card.cardsInCollection, () => card.setCode))
    ))
    // Put them in an object and count by color
    const setCodesCount = _.countBy(setCodesOfEachCard)
    // Convert set codes to set names
    const setNamesCount = {}
    _.forEach(setCodesCount, (count, code) => {
      const setName = _.find(this.props.cardSets, { code }).name
      setNamesCount[setName] = count
    })
    return setNamesCount
  }

  // Prepares data for types bar chart
  createTypesChartData = collection => {
    // Create an array of types for each individual card from the collection
    const typesOfEachCard = _.flatMapDeep(collection, card => (
      _.map(card.variants, card => _.times(card.cardsInCollection, () => card.types))
    ))
    // Put them in an object and count by type
    return _.countBy(typesOfEachCard)
  }

  // Prepares data for subtypes bar chart
  createCreatureTypesChartData = collection => {
    // Create an array of subtypes for each individual card from the collection
    const creatures = _.filter(collection, card => _.includes(card.types, 'Creature'))
    const creatureTypes = _.flatMapDeep(creatures, card => (
      _.map(card.variants, card => _.times(card.cardsInCollection, () => card.subtypes))
    ))
    // Put them in an object and count by subtype
    return _.countBy(creatureTypes)
  }

  initCharts = () => {
    const { cardColorsCount: { White, Blue, Black, Red, Green, undefined } } = this.state

    const cardColorsChart = new Chart('cardColorsChart', { // eslint-disable-line
      type: 'pie',
      data: {
        labels: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless'],
        datasets: [{
          backgroundColor: ['#f0f2c0', '#b5cde3', '#aca29a', '#db8664', '#93b483', '#beb9b2'],
          data: [White, Blue, Black, Red, Green, undefined]
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        }
      }
    })

    const { setNamesCount } = this.state
    const cardSetsChartLabels = []
    const cardSetsChartData = []
    _.forEach(setNamesCount, (count, name) => {
      cardSetsChartLabels.push(name)
      cardSetsChartData.push(count)
    })

    const cardSetsChart = new Chart('cardSetsChart', { // eslint-disable-line
      type: 'bar',
      data: {
        labels: cardSetsChartLabels,
        datasets: [
          {
            data: cardSetsChartData
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    const { cardTypesCount } = this.state
    const cardTypesChartLabels = []
    const cardTypesChartData = []
    _.forEach(cardTypesCount, (count, type) => {
      cardTypesChartLabels.push(type)
      cardTypesChartData.push(count)
    })

    const cardTypesChart = new Chart('cardTypesChart', { // eslint-disable-line
      type: 'bar',
      data: {
        labels: cardTypesChartLabels,
        datasets: [
          {
            data: cardTypesChartData
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    const { creatureTypesCount } = this.state
    const creatureTypesChartLabels = []
    const creatureTypesChartData = []
    _.forEach(creatureTypesCount, (count, type) => {
      creatureTypesChartLabels.push(type)
      creatureTypesChartData.push(count)
    })

    const creatureTypesChart = new Chart('creatureTypesChart', { // eslint-disable-line
      type: 'bar',
      data: {
        labels: creatureTypesChartLabels,
        datasets: [
          {
            data: creatureTypesChartData
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
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
            <canvas id="cardColorsChart" />
            {/* <figcaption>Multicolored cards will make total number of above data bigger then the total number of cards</figcaption> */}
          </figure>
          <figure>
            <canvas id="cardSetsChart" />
          </figure>
          <figure>
            <canvas id="cardTypesChart" />
          </figure>
          <figure>
            <canvas id="creatureTypesChart" />
          </figure>
        </Flex>
      </StyledCollectionStats>
    )
  }
}

export default connect(mapStateToProps)(CollectionStats)
