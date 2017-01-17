import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { signUp, signInWithGoogle, signInWithFacebook } from 'store/user'
import { googleIcon, facebookIcon } from 'svg'

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = { signUp, signInWithGoogle, signInWithFacebook }

const SignUpModal = ({
  formData, user, onChange, onSubmit, signInWithGoogle, signInWithFacebook,
  show, onHide, onExited
}) => {
  const { email, password, repeatedPassword } = formData
  const { signingIn, signingUp, errorMessage } = user

  return (
    <Modal
      className="authentication-modal"
      show={show}
      onHide={onHide}
      bsSize="small"
      onExited={onExited}
      style={(signingIn || signingUp) && { pointerEvents: 'none' }}
      backdrop={signingIn || signingUp ? 'static' : true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit} id="signUpForm">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Email"
              required
              value={email}
              onChange={e => onChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              required
              value={password}
              onChange={e => onChange('password', e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="repeatedPasswordInput"
              placeholder="Repeat password"
              required
              value={repeatedPassword}
              onChange={e => onChange('repeatedPassword', e.target.value)}
            />
          </div>
        </form>
        { errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="buttons">
          <button type="submit" form="signUpForm" className="btn btn-default">
            {
              signingIn || signingUp
                ? <span className="fa fa-circle-o-notch fa-spin" />
                : 'Sign up'
            }
          </button>
          <button className="btn btn-default" onClick={signInWithGoogle}>{googleIcon}</button>
          <button className="btn btn-default" onClick={signInWithFacebook}>{facebookIcon}</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

SignUpModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  user: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal)
