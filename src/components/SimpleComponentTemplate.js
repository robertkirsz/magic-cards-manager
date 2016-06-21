import { Component, PropTypes } from 'react'

class SimpleComponentTemplate extends Component {
  static propTypes = {
    foo: PropTypes.object
  }

  constructor () {
    super()
    this._foo = this._foo.bind(this)
  }

  _foo () {
    console.log('foo')
  }

  render () {
    return (
      <div className='foo'>
      </div>
    )
  }
}

export default SimpleComponentTemplate
