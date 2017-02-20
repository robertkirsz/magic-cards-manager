import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleLockMyCards } from 'store/myCards'
import cn from 'classnames'

const mapStateToProps = ({ myCards }) => ({ myCardsLocked: myCards.locked })

const mapDispatchToProps = { toggleLockMyCards }

const propTypes = {
  myCardsLocked: PropTypes.bool,
  toggleLockMyCards: PropTypes.func
}

const LockButton = ({ myCardsLocked, toggleLockMyCards }) => {
  return (
    <button
      type="button"
      className="lock-button navbar-btn"
      onClick={toggleLockMyCards}
    >
      <i className={cn('fa', { 'fa-lock': myCardsLocked, 'fa-unlock-alt': !myCardsLocked })} />
    </button>
  )
}

LockButton.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(LockButton)
