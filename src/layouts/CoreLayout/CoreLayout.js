import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import _find from 'lodash/find'
import { AuthModal, ErrorModal } from 'containers'
import { Header, SearchModule, LoadingScreen } from 'components'
import 'styles/core.scss'

const debug = true

const mapStateToProps = ({ layout, allCards, myCards, user }) => ({
  allCardsFetching: allCards.fetching,
  myCardsLoading: myCards.loading,
  userAuthPending: user.authPending
})

const mapDispatchToProps = {
}

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    routes: PropTypes.array.isRequired,
    allCardsFetching: PropTypes.bool.isRequired,
    myCardsLoading: PropTypes.bool.isRequired,
    userAuthPending: PropTypes.bool.isRequired
  }

  render () {
    const { routes, children, allCardsFetching, myCardsLoading, userAuthPending } = this.props
    if (debug) console.warn('allCardsFetching:', allCardsFetching, 'myCardsLoading:', myCardsLoading, 'userAuthPending', userAuthPending)
    // Show button at the bottom of the screen on routes that have 'showAppButtons' prop
    const showAppButtons = _find(routes, 'showAppButtons')

    return (
      <ReactCSSTransitionGroup
        transitionName="fadeOut"
        transitionEnter={false}
        transitionLeaveTimeout={500}
      >
        {
           allCardsFetching || myCardsLoading || userAuthPending
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
                {showAppButtons &&
                  <div className="app-buttons">
                    <SearchModule />
                  </div>
                }
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
