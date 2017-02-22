import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import _find from 'lodash/find'

import { closeModal } from 'store/layout'
import { loadMyCards } from 'store/myCards'
import { authSuccess, signOutSuccess } from 'store/user'
import { loadInitialSettings } from 'store/settings'

import { auth, firebaseGetData } from 'utils/firebase'

import { AuthModal, ErrorModal } from 'containers'
import { Header, SearchModule, LoadingScreen } from 'components'

import 'styles/core.scss'

const debug = true

const mapStateToProps = ({ layout, allCards, myCards, user }) => ({
  authModalOpened: layout.modal.name === 'sign in' || layout.modal.name === 'sign up',
  allCards,
  myCards,
  user
})

const mapDispatchToProps = {
  loadMyCards,
  authSuccess,
  signOutSuccess,
  closeModal,
  loadInitialSettings
}

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    allCards: PropTypes.object.isRequired,
    myCards: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    authModalOpened: PropTypes.bool,
    loadMyCards: PropTypes.func.isRequired,
    authSuccess: PropTypes.func.isRequired,
    signOutSuccess: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    loadInitialSettings: PropTypes.func.isRequired,
    routes: PropTypes.array
  }

  constructor () {
    super()

    this.listenToAuthChange = this.listenToAuthChange.bind(this)
  }

  componentWillMount () {
    this.listenToAuthChange(this.props)
  }

  // TODO: this needs to be refactored, if "usersDataFromDatabase" returns data,
  // then there's no need to create "userData", we can use existing values
  // TODO: do not hide main spinner until user settings are loaded
  listenToAuthChange () {
    // When user's authentication status changes...
    auth.onAuthStateChanged(async firebaseUser => {
      // If he's logged in...
      if (firebaseUser) {
        const { uid, displayName, email, photoURL } = firebaseUser

        if (debug) console.info('User logged in as', displayName || email)
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
        // Save user's data in Fireabse and in store
        this.props.authSuccess(userData)
        // Close any sign in or sign up modals
        if (this.props.authModalOpened) this.props.closeModal()
        // Load user's collection
        this.props.loadMyCards()
        // Apply user's setting if he has any stored
        _get(usersDataFromDatabase, 'data.settings') && this.props.loadInitialSettings(usersDataFromDatabase.data.settings)
      // If user's not logged in or logged out...
      } else {
        // Log that into console
        if (debug) console.warn('No user')
      }
    })
  }

  render () {
    // TODO: add fadeOut effect when page loads
    if (this.props.allCards.fetching) return <LoadingScreen />

    const showAppButtons = _find(this.props.routes, 'showAppButtons')

    return (
      <div id="app">
        <Header />
        {this.props.children}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
