import { Component } from 'react'
import _unset from 'lodash/unset'

const keyboardKeys = (e) => {
  const keys = {}

  switch (e.keyCode) {
    case 37: keys.left = true; break
    case 38: keys.up = true; break
    case 39: keys.right = true; break
    case 40: keys.down = true; break
    case 9: keys.tab = true; break
    case 13: keys.enter = true; break
    case 27: keys.esc = true; break
    case 8: keys.bkspc = true; break
    default: break
  }

  if (e.shiftKey && keys.tab) {
    keys.shiftTab = true
    _unset(keys, 'tab')
  }

  return keys
}

const debug = false

class KeyboardNavigation extends Component {
  componentDidMount () {
    window.addEventListener('keydown', this.trackKeyboard)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.trackKeyboard)
  }

  trackKeyboard = e => {
    const keys = keyboardKeys(e)
    if (debug) console.info(keys)
  }

  render = () => null
}

export default KeyboardNavigation
