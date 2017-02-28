import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleSetting } from 'store/settings'
import cn from 'classnames'

const mapStateToProps = ({ settings }) => ({ myCardsLocked: settings.myCardsLocked })

const mapDispatchToProps = {
  toggleSetting
}

const propTypes = {
  myCardsLocked: PropTypes.bool,
  toggleSetting: PropTypes.func
}

const LockButton = ({ myCardsLocked, toggleSetting }) => {
  return (
    <button
      type="button"
      className="lock-button navbar-btn"
      onClick={() => { toggleSetting('myCardsLocked') }}
    >
      <i className={cn('fa', { 'fa-lock': myCardsLocked, 'fa-unlock-alt': !myCardsLocked })} />
    </button>
  )
}

LockButton.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(LockButton)
