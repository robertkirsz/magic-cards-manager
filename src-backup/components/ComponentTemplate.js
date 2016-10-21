import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as modalActions } from 'redux/modules/modal'

const mapStateToProps = (state) => ({
  modal: state.modal
})

const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(modalActions, dispatch)
})

class ComponentTemplate extends React.Component {
  constructor () {
    super()
    this._closeModal = this._closeModal.bind(this)
  }

  _closeModal () {
    this.props.modalActions.closeModal()
  }

  render () {
    return (
      <div className=''>
      </div>
    )
  }
}

ComponentTemplate.propTypes = {
  modalActions: React.PropTypes.object,
  modal: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentTemplate)
