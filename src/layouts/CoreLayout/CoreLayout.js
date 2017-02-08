import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { saveHeaderHeight, closeModal } from 'store/layout'
import { loadMyCards } from 'store/myCards'
import { authSuccess, signOutSuccess } from 'store/user'
import { auth, firebaseGetData } from 'utils/firebase'
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
  saveHeaderHeight,
  loadMyCards,
  authSuccess,
  signOutSuccess,
  closeModal
}

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    saveHeaderHeight: PropTypes.func,
    loadMyCards: PropTypes.func,
    allCards: PropTypes.object,
    myCards: PropTypes.object,
    user: PropTypes.object,
    authModalOpened: PropTypes.bool,
    authSuccess: PropTypes.func,
    signOutSuccess: PropTypes.func,
    closeModal: PropTypes.func
  }

  constructor () {
    super()

    this.listenToAuthChange = this.listenToAuthChange.bind(this)
  }

  componentWillMount () {
    this.listenToAuthChange(this.props)
  }

  listenToAuthChange () {
    // When user's authentication status changes...
    auth.onAuthStateChanged(async firebaseUser => {
      // If he's logged in...
      if (firebaseUser) {
        if (debug) console.info('User logged in as', firebaseUser.displayName || firebaseUser.email)
        // Get currect time
        const now = Date.now()
        // Gather user's data from Firebase authentication
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL,
          lastLogin: now
        }
        // Get user's data from database
        const firebaseResponse = await firebaseGetData('Users', firebaseUser.uid)
        // Set 'createdOn' property if user's date doesn't exist yet
        if (firebaseResponse.error === 'No data found')
          userData.createdOn = now
        // Save user's data in Fireabse and in store
        this.props.authSuccess(userData)
        // Close any sign in or sign up modals
        if (this.props.authModalOpened) this.props.closeModal()
        // Load user's collection
        this.props.loadMyCards()
      // If user's not logged in or logged out...
      } else {
        // Log that into console
        if (debug) console.warn('No user')
      }
    })
  }

  render () {
    const app = (
      <div id="app">
        <Header />
        {this.props.children}
        <div className="app-buttons">
          <SearchModule />
        </div>
      </div>
    )

    return this.props.allCards.fetching
      ? <LoadingScreen />
      : app
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
