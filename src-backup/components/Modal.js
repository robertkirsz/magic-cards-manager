import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as modalActions } from 'redux/modules/modal'
import CardDetailsModal from 'components/CardDetailsModal'

const mapStateToProps = (state) => ({
  modal: state.modal
})

const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(modalActions, dispatch)
})

class Modal extends React.Component {
  constructor () {
    super()
    this._closeModal = this._closeModal.bind(this)
  }

  _closeModal () {
    this.props.modalActions.closeModal()
  }

  render () {
    const modalData = this.props.modal
    let modal = null
    if (modalData.modalName) {
      if (modalData.modalName === 'card-details') {
        modal = <CardDetailsModal cardToDisplay={modalData.cardToDisplay} />
      }
    }

    return (
      <div className='modal-cover'>
        <div className='modal-window'>
          <i className='fa fa-times' onClick={this._closeModal} />
          {modal}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  modalActions: React.PropTypes.object,
  modal: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
