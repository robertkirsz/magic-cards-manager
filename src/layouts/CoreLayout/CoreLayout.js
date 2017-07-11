import React, { Component } from 'react'
import PropTypes from 'proptypes'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import _find from 'lodash/find'
import { AuthModal, ErrorModal, KeyboardNavigation } from 'containers'
import { Header, SearchModule, KeyboardModeButton, LoadingScreen } from 'components'
import 'styles/core.scss'

const debug = true

const mapStateToProps = ({ layout, allCards, myCards, user }) => ({
  allCardsFetching: allCards.fetching,
  myCardsLoading: myCards.loading,
  userAuthPending: user.authPending
})

class CoreLayout extends Component {
  state = { showSpinner: true }

  componentWillReceiveProps ({ allCardsFetching, myCardsLoading, userAuthPending }) {
    if (debug && this.state.showSpinner) console.info('allCardsFetching:', allCardsFetching, 'myCardsLoading:', myCardsLoading, 'userAuthPending', userAuthPending)

    if (!allCardsFetching && !myCardsLoading && !userAuthPending && this.state.showSpinner) {
      setTimeout(() => { this.setState({ showSpinner: false }) }, 1000)
    }
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    allCardsFetching: PropTypes.bool.isRequired,
    myCardsLoading: PropTypes.bool.isRequired,
    userAuthPending: PropTypes.bool.isRequired
  }

  render () {
    const { routes, children } = this.props
    // Show button at the bottom of the screen on routes that have 'showAppButtons' prop
    const showAppButtons = _find(routes, 'showAppButtons')
    const topRoute = this.props.routes[this.props.routes.length - 1].path

    return (
      <ReactCSSTransitionGroup
        transitionName="fadeOut"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {
           this.state.showSpinner
            ? <LoadingScreen key="a" />
            : (
              <div id="app" key="b">
                <Header />
                {children}
                {showAppButtons &&
                  <div className="app-buttons">
                    <SearchModule />
                    <KeyboardModeButton />
                  </div>
                }
                <AuthModal />
                <ErrorModal />
                <KeyboardNavigation
                  onCardsListPage={topRoute === 'all-cards' || topRoute === 'my-cards'}
                  onCardDetailsPage={this.props.params.cardUrl !== undefined}
                />
              </div>
            )
        }
      </ReactCSSTransitionGroup>
    )
  }
}

export default connect(mapStateToProps)(CoreLayout)
