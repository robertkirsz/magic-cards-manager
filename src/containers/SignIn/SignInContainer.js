import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SignInModal from './SignInModal'
import { signIn, clearErrors } from 'store/user'

const $ = window.$

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  signIn,
  clearErrors
}

class SignInContainer extends Component {
  static propTypes = {
    signIn: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.updateForm = this.updateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    $('#SignInModal').on('hidden.bs.modal', () => {
      this.props.clearErrors()
    })
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
        formData={this.state}
        onChange={this.updateForm}
        onSubmit={this.submitForm}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
