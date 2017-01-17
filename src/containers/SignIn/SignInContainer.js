import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SignInModal from './SignInModal'
import { signIn, clearErrors } from 'store/user'
import { closeModal } from 'store/layout'

const mapStateToProps = ({ layout }) => ({ modalName: layout.modal.name })

const mapDispatchToProps = { signIn, clearErrors, closeModal }

class SignInContainer extends Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.updateForm = this.updateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.onExited = this.onExited.bind(this)

    this.state = {
      email: '',
      password: ''
    }
  }

  onExited () {
    this.props.clearErrors()
  }

  updateForm (property, value) {
    this.setState({ [property]: value })
  }

  submitForm (e) {
    e.preventDefault()
    this.props.signIn(this.state)
  }

  render () {
    return (
      <SignInModal
        show={this.props.modalName === 'signIn'}
        onHide={this.props.closeModal}
        formData={this.state}
        onChange={this.updateForm}
        onSubmit={this.submitForm}
        onExited={this.onExited}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
