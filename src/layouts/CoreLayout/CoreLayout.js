import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'
import { cardsDatabase } from 'database'
import { saveHeaderHeight, closeModal } from 'store/layout'
import { restoreMyCards } from 'store/myCards'
import { signInSuccess, signUpSuccess, signOutSuccess } from 'store/user'
import { loadLocalStorage } from 'utils'
import { auth } from 'utils/firebase'
import { Header, SearchModule, LoadingScreen } from 'components'
import 'styles/core.scss'

const mapStateToProps = ({ layout, allCards, user }) => ({
  modalOpened: layout.modal.name !== '',
  headerHeight: layout.headerHeight,
  allCards,
  user
})

const mapDispatchToProps = {
  saveHeaderHeight,
  restoreMyCards,
  signInSuccess,
  signUpSuccess,
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
    modalOpened: PropTypes.bool,
    signInSuccess: PropTypes.func,
    signUpSuccess: PropTypes.func,
    signOutSuccess: PropTypes.func,
    closeModal: PropTypes.func
  }

  componentWillMount () {
    auth.onAuthStateChanged(firebaseUser => {
      const { signingUp, signedIn } = this.props.user

      if (!firebaseUser) console.warn('No user')
      else console.info('User logged in as', firebaseUser.email)

      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL
        }

        if (signingUp) {
          this.props.signUpSuccess(userData)
          if (this.props.modalOpened) this.props.closeModal()
        } else {
          this.props.signInSuccess(userData)
          if (this.props.modalOpened) this.props.closeModal()
        }
      } else {
        if (signedIn) this.props.signOutSuccess()
      }
    })
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
