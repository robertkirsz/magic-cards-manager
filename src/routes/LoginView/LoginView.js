import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { auth } from 'utils/firebase'

class LoginView extends Component {
  static propTypes = {
    routes: PropTypes.array
  }

  constructor () {
    super()

    this.backgroundClick = this.backgroundClick.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.signUp = this.signUp.bind(this)
    this.signOut = this.signOut.bind(this)

    this.state = {
      email: '',
      password: '',
      authError: ''
    }
  }

  backgroundClick () {
    // TODO: When you start on signIn page, there is nowhere to go back
    browserHistory.push(`/${this.props.routes[1].path}`)
  }

  componentDidMount () {
    auth.getRedirectResult().then((result) => {
      console.warn('getRedirectResult', result)
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        console.warn('token', token)
        // ...
      }
      // The signed-in user info.
      const user = result.user
      console.warn('user', user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
      // ...
      console.warn('ERROR', 'errorCode', errorCode, 'errorMessage', errorMessage, 'email', email, 'credential', credential) // eslint-disable-line
    })
  }

  updateForm (field, value) {
    this.setState({ [field]: value })
  }

  signUp () {
    this.setState({ authError: '' })

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ authError: error.message }))
  }

  // TODO: make a separate modal Component that others can extend
  render () {
    return (
      <div className="signIn-view" onClick={this.backgroundClick}>
        <div className="content" onClick={e => e.stopPropagation()}>
          <h5>Login</h5>
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={e => { this.updateForm('email', e.target.value) }}
          />
          <input
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={e => { this.updateForm('password', e.target.value) }}
          />
          <div>
            <button onClick={this.signUp}>Sign up</button>
            <button onClick={this.signInGoogle}>Log in with Google</button>
            <button onClick={this.signInFacebook}>Log in with Facebook</button>
            <button onClick={this.signOut}>Sign out</button>
          </div>
          {this.state.authError && <p style={{ color: 'red' }}>{this.state.authError}</p>}
        </div>
      </div>
    )
  }
}

export default LoginView
