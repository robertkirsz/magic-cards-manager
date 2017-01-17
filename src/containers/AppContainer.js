import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { getCards } from 'store/allCards'
import { AuthModal } from 'containers'

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    // TODO: add error handler when server is not available
    this.props.store.dispatch(getCards())
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} children={routes} />
          <AuthModal />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
