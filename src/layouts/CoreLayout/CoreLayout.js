import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Measure from 'react-measure'
import { cardsDatabase } from 'database'
import { saveHeaderHeight } from 'store/layout'
import { restoreMyCards } from 'store/myCards'
import { signInSuccess, signUpSuccess, signOutSuccess } from 'store/user'
import { loadLocalStorage } from 'utils'
import { auth } from 'utils/firebase'
import { Header, SearchModule, LoadingScreen } from 'components'
import 'styles/core.scss'

const $ = window.$

const mapStateToProps = ({ layout, allCards, user }) => ({
  headerHeight: layout.headerHeight,
  allCards,
  user
})

const mapDispatchToProps = {
  saveHeaderHeight,
  restoreMyCards,
  signInSuccess,
  signUpSuccess,
  signOutSuccess
}

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    headerHeight: PropTypes.number,
    saveHeaderHeight: PropTypes.func,
    restoreMyCards: PropTypes.func,
    allCards: PropTypes.object,
    user: PropTypes.object,
    signInSuccess: PropTypes.func,
    signUpSuccess: PropTypes.func,
    signOutSuccess: PropTypes.func
  }

  componentWillMount () {
    auth.onAuthStateChanged(firebaseUser => {
      const { signingUp, signedIn } = this.props.user
      console.warn('onAuthStateChanged', firebaseUser)
      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL
        }

        if (signingUp) {
          $('#SignUpModal').modal('hide')
          this.props.signUpSuccess(userData)
        } else {
          $('#SignInModal').modal('hide')
          this.props.signInSuccess(userData)
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
