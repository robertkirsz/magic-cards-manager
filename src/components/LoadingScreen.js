import React, { PropTypes } from 'react'
import cn from 'classnames'

const LoadingScreen = props => (
  <div className="LoadingScreen">
    <span className="LoadingScreen__Spinner fa fa-circle-o-notch fa-spin fa-4x" />
    <div className="LoadingScreen__Checks">
      <i className={cn('LoadingScreen__Check fa fa-check-circle', { loaded: !props.allCardsFetching })} />
      <i className={cn('LoadingScreen__Check fa fa-check-circle', { loaded: !props.userAuthPending })} />
      <i className={cn('LoadingScreen__Check fa fa-check-circle', { loaded: !props.myCardsLoading })} />
    </div>
  </div>
)

LoadingScreen.propTypes = {
  allCardsFetching: PropTypes.bool.isRequired,
  myCardsLoading: PropTypes.bool.isRequired,
  userAuthPending: PropTypes.bool.isRequired
}

export default LoadingScreen
