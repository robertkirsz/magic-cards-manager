import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as modalsActions } from 'redux/modules/modals'

const mapStateToProps = (state) => ({
  modals: state.modals
})

const mapDispatchToProps = (dispatch) => ({
  modalsActions: bindActionCreators(modalsActions, dispatch)
})

class Modal extends React.Component {
  constructor () {
    super()
    this._closeModal = this._closeModal.bind(this)
  }

  _closeModal (modalId) {
    this.props.modalsActions.closeModal(modalId)
  }

  render () {
    return (
      <div className='modal-cover'>
        <div className='modal-window'>
          <i className='fa fa-times closeModal-button' onClick={this._closeModal.bind(this, 'testId')} />
          <header>Test modal</header>
          <section>
            <p>Test test test</p>
            <span className='button button--gray'>Next</span>
          </section>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  modalsActions: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
