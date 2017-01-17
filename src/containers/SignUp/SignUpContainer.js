import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SignUpModal from './SignUpModal'
import { signUp, clearErrors } from 'store/user'

const $ = window.$

const mapStateToProps = () => ({})

const mapDispatchToProps = { signUp, clearErrors }

class SignUpContainer extends Component {
  static propTypes = {
    signUp: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.updateForm = this.updateForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      email: '',
      password: '',
      repeatedPassword: ''
    }
  }

  componentDidMount () {
    $('#SignUpModal').on('hidden.bs.modal', () => {
      this.props.clearErrors()
    })
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

    if (this.validateForm()) {
      this.props.signUp(this.state)
    }
  }

  render () {
    return (
      <SignUpModal
        formData={this.state}
        onChange={this.updateForm}
        onSubmit={this.submitForm}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
