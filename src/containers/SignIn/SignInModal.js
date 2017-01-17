import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { signIn, signInWithGoogle, signInWithFacebook } from 'store/user'
import { googleIcon, facebookIcon } from 'svg'

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = { signIn, signInWithGoogle, signInWithFacebook }

const SignInModal = ({ formData, user, onChange, onSubmit, signInWithGoogle, signInWithFacebook }) => {
  const { email, password } = formData
  const { signingIn, errorMessage } = user

  return (
    <div className="modal fade" id="SignInModal" tabIndex="-1" role="dialog" aria-labelledby="signInModalLabel">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">Sign in</h4>
          </div>
          <div className="modal-body">
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
          </div>
        </div>
      </div>
    </div>
  )
}

SignInModal.propTypes = {
  formData: PropTypes.object.isRequired,
  user: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal)
