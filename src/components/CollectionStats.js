import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CollectionStats as StyledCollectionStats } from 'styled'

const mapStateToProps = ({ myCards }) => ({
  collection: myCards.cards,
  collectionIsLoading: myCards.loading
})

class CollectionStats extends Component {
  static propTypes = {
    collection: PropTypes.array.isRequired,
    collectionIsLoading: PropTypes.bool.isRequired
  }

  componentWillMount () {
    if (!this.props.collectionIsLoading) {
      this.prepareStats(this.props.collection)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.collectionIsLoading && !nextProps.collectionIsLoading) {
      this.prepareStats(nextProps.collection)
    }
  }

  prepareStats = collection => {
    if (!collection.length) return
  }

  render () {
    if (this.props.collectionIsLoading) return <StyledCollectionStats>Loading collection...</StyledCollectionStats>

    if (!this.props.collection.length) return <StyledCollectionStats>No cards in collection</StyledCollectionStats>

    return (
      <StyledCollectionStats>CollectionStats</StyledCollectionStats>
    )
  }
}

export default connect(mapStateToProps)(CollectionStats)
