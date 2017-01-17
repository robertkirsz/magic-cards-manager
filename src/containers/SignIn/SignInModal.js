import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { signIn, signInWithGoogle, signInWithFacebook } from 'store/user'
import { googleIcon, facebookIcon } from 'svg'

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = { signIn, signInWithGoogle, signInWithFacebook }

const SignInModal = ({
  formData, user, onChange, onSubmit, signInWithGoogle, signInWithFacebook,
  show, onHide, onExited
}) => {
  const { email, password } = formData
  const { signingIn, errorMessage } = user

  return (
    <Modal
      className="authentication-modal"
      show={show}
      onHide={onHide}
      bsSize="small"
      onExited={onExited}
      style={signingIn && { pointerEvents: 'none' }}
      backdrop={signingIn ? 'static' : true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
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
          { errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="buttons">
            <button type="submit" className="btn btn-default">
              {
                signingIn
                  ? <span className="fa fa-circle-o-notch fa-spin" />
                  : 'Sign in'
              }
            </button>
            <button className="btn btn-default" onClick={signInWithGoogle}>{googleIcon}</button>
            <button className="btn btn-default" onClick={signInWithFacebook}>{facebookIcon}</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

SignInModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal)
