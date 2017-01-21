import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'
import { cardsDatabase } from 'database'
import { saveHeaderHeight, closeModal } from 'store/layout'
import { restoreMyCards } from 'store/myCards'
import { authSuccess, signOutSuccess } from 'store/user'
import { loadLocalStorage } from 'utils'
import { auth, firebaseGetData } from 'utils/firebase'
import { Header, SearchModule, LoadingScreen } from 'components'
import 'styles/core.scss'

const mapStateToProps = ({ layout, allCards, user }) => ({
  authModalOpened: layout.modal.name === 'sign in' || layout.modal.name === 'sign up',
  headerHeight: layout.headerHeight,
  allCards,
  user
})

const mapDispatchToProps = {
  saveHeaderHeight,
  restoreMyCards,
  authSuccess,
  signOutSuccess,
  closeModal
}

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    headerHeight: PropTypes.number,
    saveHeaderHeight: PropTypes.func,
    restoreMyCards: PropTypes.func,
    allCards: PropTypes.object,
    user: PropTypes.object,
    authModalOpened: PropTypes.bool,
    authSuccess: PropTypes.func,
    signOutSuccess: PropTypes.func,
    closeModal: PropTypes.func
  }

  componentWillMount () {
    this.listenToAuthChange(this.props)
  }

  componentWillReceiveProps (nextProps) {
    // If we've received cards database...
    if (this.props.allCards.fetching && !nextProps.allCards.fetching) {
      // Get collection from Local Storage
      const restoredCollection = loadLocalStorage(cardsDatabase)
      // Save it to the store
      this.props.restoreMyCards(restoredCollection)
    }
  }

  listenToAuthChange (props) {
    // When user's authentication status changes...
    auth.onAuthStateChanged(async firebaseUser => {
      // If he's logged in...
      if (firebaseUser) {
        console.info('User logged in as', firebaseUser.email)
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
        props.authSuccess(userData)
        // Close any sign in or sign up modals
        if (props.authModalOpened) props.closeModal()
      // If user's not logged in or logged out...
      } else {
        // Log that into console
        console.warn('No user')
      }
    })
  }

  render () {
    const app = (
      <div id="app">
        <Measure onMeasure={({ height }) => {
          if (height !== this.props.headerHeight) this.props.saveHeaderHeight(height)
        }}>
          <div className="fixed-wrapper">
            <Header />
            <SearchModule />
          </div>
        </Measure>
        {this.props.children}
      </div>
    )

    return this.props.allCards.fetching
      ? <LoadingScreen />
      : app
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
