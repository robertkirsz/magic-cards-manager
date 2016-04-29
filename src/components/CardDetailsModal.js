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

class CardDetailsModal extends React.Component {
  constructor () {
    super()
    this.state = {}
    this._closeModal = this._closeModal.bind(this)
  }

  _closeModal () {
    this.props.modalActions.closeModal(this.props.modal[0])
  }

  render () {
    return (
      <div className='card-details-modal'>
        <pre>
          {
            JSON.stringify(this.props.cardToDisplay, null, 2)
          }
        </pre>
      </div>
    )
  }
}

CardDetailsModal.propTypes = {
  modal: React.PropTypes.array,
  modalActions: React.PropTypes.object,
  cardToDisplay: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsModal)
