import React from 'react'
import PropTypes from 'proptypes'
import { BottomRoundButton } from 'styled'
import { connect } from 'react-redux'
import { toggleKeyboardMode } from 'store/keyboard'

const mapStateToProps = ({ keyboard }) => ({
  keyboardMode: keyboard.keyboardMode
})

const mapDispatchToProps = { toggleKeyboardMode }

const propTypes = {
  keyboardMode: PropTypes.bool.isRequired,
  toggleKeyboardMode: PropTypes.func.isRequired
}

const KeyboardModeButton = props => (
  <BottomRoundButton
    active={props.keyboardMode}
    title="Keyboard mode"
    onClick={props.toggleKeyboardMode}
  >
    <i className="fa fa-keyboard-o" aria-hidden="true" />
  </BottomRoundButton>
)

KeyboardModeButton.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardModeButton)
