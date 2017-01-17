import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SignUpModal from './SignUpModal'
import { signUp, clearErrors } from 'store/user'
import { closeModal } from 'store/layout'

const mapStateToProps = ({ layout }) => ({ modalName: layout.modal.name })

const mapDispatchToProps = { signUp, clearErrors, closeModal }

class SignUpContainer extends Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.updateForm = this.updateForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.onExited = this.onExited.bind(this)

    this.state = {
      email: '',
      password: '',
      repeatedPassword: ''
    }
  }

  onExited () {
    this.props.clearErrors()
  }

  updateForm (property, value) {
    this.setState({ [property]: value })
  }

  validateForm (formData = this.state) {
    // TODO: check if it work with autofill
    // Check if passwords match
    if (formData.password !== formData.repeatedPassword) return false

    return true
  }

  submitForm (e) {
    e.preventDefault()

    if (this.validateForm()) this.props.signUp(this.state)
  }

  render () {
    return (
      <SignUpModal
        show={this.props.modalName === 'signUp'}
        onHide={this.props.closeModal}
        formData={this.state}
        onChange={this.updateForm}
        onSubmit={this.submitForm}
        onExited={this.onExited}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
