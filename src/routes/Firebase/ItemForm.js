import React, { Component, PropTypes } from 'react'

class ItemForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired
  }

  constructor () {
    super()

    this.updateForm = this.updateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      id: '',
      name: ''
    }
  }

  updateForm (property, e) {
    this.setState({ [property]: e.target.value })
  }

  submitForm (e) {
    e.preventDefault()

    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <form onSubmit={this.submitForm}>
        <input type="text" placeholder="Id" onChange={e => this.updateForm('id', e)} />
        <input type="text" placeholder="Value" onChange={e => this.updateForm('name', e)} />
        <button type="submit">{this.props.buttonLabel}</button>
      </form>
    )
  }
}

export default ItemForm
