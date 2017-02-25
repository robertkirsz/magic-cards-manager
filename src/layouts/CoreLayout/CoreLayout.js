import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import _get from 'lodash/get'
import _find from 'lodash/find'

import { authRequest, authSuccess, signOutSuccess } from 'store/user'
import { loadInitialSettings } from 'store/settings'
import { loadMyCards } from 'store/myCards'
import { closeModal } from 'store/layout'

import { auth, firebaseGetData } from 'utils/firebase'

import { AuthModal, ErrorModal } from 'containers'
import { Header, SearchModule, LoadingScreen } from 'components'

import 'styles/core.scss'

const debug = true

const mapStateToProps = ({ layout, allCards, myCards, user }) => ({
  authModalOpened:  layout.modal.name === 'sign in' || layout.modal.name === 'sign up',
  allCardsFetching: allCards.fetching,
  myCardsLoading:   myCards.loading,
  userAuthPending:  user.authPending
})

const mapDispatchToProps = {
  authRequest,
  authSuccess,
  signOutSuccess,
  loadInitialSettings,
  loadMyCards,
  closeModal
}

class CoreLayout extends Component {
  static propTypes = {
    children:            PropTypes.element.isRequired,
    routes:              PropTypes.array.isRequired,
    allCardsFetching:    PropTypes.bool.isRequired,
    myCardsLoading:      PropTypes.bool.isRequired,
    userAuthPending:     PropTypes.bool.isRequired,
    authModalOpened:     PropTypes.bool.isRequired,
    loadMyCards:         PropTypes.func.isRequired,
    authRequest:         PropTypes.func.isRequired,
    authSuccess:         PropTypes.func.isRequired,
    signOutSuccess:      PropTypes.func.isRequired,
    closeModal:          PropTypes.func.isRequired,
    loadInitialSettings: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.listenToAuthChange(this.props)
  }

  // TODO: do not hide main spinner until user settings are loaded
  listenToAuthChange = () => {
    // When user's authentication status changes...
    auth.onAuthStateChanged(async firebaseUser => {
      // If he's logged in...
      if (firebaseUser) {
        const { authRequest, authSuccess, authModalOpened, closeModal, loadMyCards, loadInitialSettings } = this.props
        // Get user's from Firebase auth object
        const { uid, displayName, email, photoURL } = firebaseUser
        if (debug) console.info('User logged in as', displayName || email)
        // Show loading message
        authRequest()
        // Get currect time
        const now = Date.now()
        // Gather user's data from Firebase authentication
        const userData = {
          uid,
          displayName,
          email,
          photoURL,
          lastLogin: now
        }
        // Get user's data from database
        const usersDataFromDatabase = await firebaseGetData('Users', uid)
        // Set 'createdOn' property if user's date doesn't exist yet
        if (!usersDataFromDatabase.success) userData.createdOn = now
        // Check if user is an admin
        const userIsAdmin = await firebaseGetData('Admins', uid)
        if (userIsAdmin.success) userData.admin = true
        // Save user's data in Firebase and in store
        authSuccess(userData)
        // Close any sign in or sign up modals
        if (authModalOpened) closeModal()
        // Load user's collection
        loadMyCards()
        // Apply user's setting if he has any stored
        _get(usersDataFromDatabase, 'data.settings') && loadInitialSettings(usersDataFromDatabase.data.settings)
      // If user's not logged in or logged out...
      } else {
        authSuccess({})
        // Log that into console
        if (debug) console.warn('No user')
      }
    })
  }

  render () {
    const { routes, children, allCardsFetching, myCardsLoading, userAuthPending } = this.props

    // Show button at the bottom of the screen on routes that have 'showAppButtons' prop
    const showAppButtons = _find(routes, 'showAppButtons')

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={3000}
        transitionLeaveTimeout={3000}
      >
        {
          true || allCardsFetching || myCardsLoading || userAuthPending
            ? (
              <LoadingScreen
                key="a"
                allCardsFetching={allCardsFetching}
                myCardsLoading={myCardsLoading}
                userAuthPending={userAuthPending}
              />
            )
            : (
              <div id="app" key="b">
                <Header />
                {children}
                {showAppButtons && (
                  <div className="app-buttons">
                    <SearchModule />
                  </div>
                )}
                <AuthModal />
                <ErrorModal />
              </div>
            )
        }
      </ReactCSSTransitionGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
