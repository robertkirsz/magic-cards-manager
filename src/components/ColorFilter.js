import React, { PropTypes } from 'react'

const ColorCheckbox = ({ color, symbol, checked, onChange }) => (
  <label>
    <input
      type="checkbox"
      value={color}
      checked={checked}
      onChange={onChange}
    />
    <span
      className={`icon ms ms-cost ms-${symbol}`}
      style={
        !checked
        ? { opacity: 0.4, backgroundColor: 'transparent' }
        : {}
      }
    />
  </label>
)

ColorCheckbox.propTypes = {
  color: PropTypes.string,
  symbol: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

const ColorFilter = ({ colors, onChange }) => (
  <div className="color-filter">
    <ColorCheckbox color="White" symbol="w" checked={colors.White} onChange={onChange} />
    <ColorCheckbox color="Blue" symbol="u" checked={colors.Blue} onChange={onChange} />
    <ColorCheckbox color="Black" symbol="b" checked={colors.Black} onChange={onChange} />
    <ColorCheckbox color="Red" symbol="r" checked={colors.Red} onChange={onChange} />
    <ColorCheckbox color="Green" symbol="g" checked={colors.Green} onChange={onChange} />
    <ColorCheckbox color="Colorless" symbol="c" checked={colors.Colorless} onChange={onChange} />
  </div>
)

ColorFilter.propTypes = {
  colors: PropTypes.object,
  onChange: PropTypes.func
}

export default ColorFilter
