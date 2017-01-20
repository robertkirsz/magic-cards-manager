import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { signIn, signUp, signInWithProvider, showAuthError, clearErrors } from 'store/user'
import { closeModal } from 'store/layout'
import { googleIcon, facebookIcon, twitterIcon, githubIcon } from 'svg'

const mapStateToProps = ({ user, layout }) => ({
  user,
  modalName: layout.modal.name
})

const mapDispatchToProps = { signIn, signUp, signInWithProvider, showAuthError, clearErrors, closeModal }

class AuthModal extends Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    signInWithProvider: PropTypes.func.isRequired,
    showAuthError: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.updateForm = this.updateForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.onExited = this.onExited.bind(this)

    this.initialState = {
      email: '',
      password: '',
      repeatedPassword: ''
    }

    this.state = this.initialState
  }

  onExited () {
    this.setState(this.initialState)
    if (this.props.user.errorMessage) this.props.clearErrors()
  }

  updateForm (property, value) {
    this.setState({ [property]: value })
  }

  validateForm (formData = this.state) {
    // TODO: check if it works with autofill
    if (formData.password !== formData.repeatedPassword) {
      this.props.showAuthError('Passwords don\'t match')
      return false
    }

    return true
  }

  submitForm (e) {
    e.preventDefault()

    const { modalName, signIn, signUp } = this.props

    if (modalName === 'sign in') signIn(this.state)
    if (modalName === 'sign up' && this.validateForm()) signUp(this.state)
  }

  render () {
    const { modalName, user, signInWithProvider, closeModal } = this.props
    const { signingIn, signingUp, errorMessage } = user
    const { email, password, repeatedPassword } = this.state

    const showModal = modalName === 'sign in' || modalName === 'sign up'
    const disableAutocomplete = modalName === 'sign up'

    return (
      <Modal
        className="authentication-modal"
        show={showModal}
        onHide={closeModal}
        bsSize="small"
        onExited={this.onExited}
        style={(signingIn || signingUp) && { pointerEvents: 'none' }}
        backdrop={signingIn || signingUp ? 'static' : true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitForm} id="authForm">
            <div className="form-group">
              <input
                type="email"
                name={disableAutocomplete ? Date.now().toString() : 'email'}
                className="form-control"
                id="emailInput"
                placeholder="Email"
                required
                value={email}
                onChange={e => this.updateForm('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name={disableAutocomplete ? Date.now().toString() : 'password'}
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                required
                value={password}
                onChange={e => this.updateForm('password', e.target.value)}
              />
            </div>
            {
              modalName === 'sign up' &&
                <div className="form-group">
                  <input
                    type="password"
                    name={disableAutocomplete ? Date.now().toString() : 'repeatedPassword'}
                    className="form-control"
                    id="repeatedPasswordInput"
                    placeholder="Repeat password"
                    required
                    value={repeatedPassword}
                    onChange={e => this.updateForm('repeatedPassword', e.target.value)}
                  />
                </div>
            }
          </form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="buttons">
            <button type="submit" form="authForm" className="btn btn-default">
              {
                signingIn || signingUp
                  ? <span className="fa fa-circle-o-notch fa-spin" />
                  : modalName
              }
            </button>
            <button className="btn btn-default" onClick={() => signInWithProvider('google')}>{googleIcon}</button>
            <button className="btn btn-default" onClick={() => signInWithProvider('facebook')}>{facebookIcon}</button>
            <button className="btn btn-default" onClick={() => signInWithProvider('twitter')}>{twitterIcon}</button>
            <button className="btn btn-default" onClick={() => signInWithProvider('github')}>{githubIcon}</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal)
