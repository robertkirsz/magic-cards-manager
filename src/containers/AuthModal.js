import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { signIn, signUp, signInWithGoogle, signInWithFacebook, showSignUpError, clearErrors } from 'store/user'
import { closeModal } from 'store/layout'
import { googleIcon, facebookIcon } from 'svg'

const mapStateToProps = ({ user, layout }) => ({
  user,
  modalName: layout.modal.name
})

const mapDispatchToProps = { signIn, signUp, signInWithGoogle, signInWithFacebook, showSignUpError, clearErrors, closeModal }

class AuthModal extends Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
    signInWithFacebook: PropTypes.func.isRequired,
    showSignUpError: PropTypes.func.isRequired,
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
      this.props.showSignUpError('Passwords don\'t match')
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
    const { modalName, user, signInWithGoogle, signInWithFacebook, closeModal } = this.props
    const { signingIn, signingUp, errorMessage } = user
    const { email, password, repeatedPassword } = this.state

    const showModal = modalName === 'sign in' || modalName === 'sign up'
    const disableAutocmplete = modalName === 'sign up'

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
                name={disableAutocmplete ? Date.now().toString() : 'email'}
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
                name={disableAutocmplete ? Date.now().toString() : 'password'}
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
                    name={disableAutocmplete ? Date.now().toString() : 'repeatedPassword'}
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
          { errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="buttons">
            <button type="submit" form="authForm" className="btn btn-default">
              {
                signingIn || signingUp
                  ? <span className="fa fa-circle-o-notch fa-spin" />
                  : modalName
              }
            </button>
            <button className="btn btn-default" onClick={signInWithGoogle}>{googleIcon}</button>
            <button className="btn btn-default" onClick={signInWithFacebook}>{facebookIcon}</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal)
