import React, { PropTypes } from 'react'

const ColorFilter = ({ colors, onChange }) => (
  <div className="mana-checkboxes">
    <label>
      <input
        type="checkbox"
        value="White"
        checked={colors.White}
        onChange={onChange}
      />
      <i
        className="ms ms-cost ms-w"
        style={!colors.White ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
      />
    </label>
    <label>
      <input
        type="checkbox"
        value="Blue"
        checked={colors.Blue}
        onChange={onChange}
      />
      <i
        className="ms ms-cost ms-u"
        style={!colors.Blue ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
      />
    </label>
    <label>
      <input
        type="checkbox"
        value="Black"
        checked={colors.Black}
        onChange={onChange}
      />
      <i
        className="ms ms-cost ms-b"
        style={!colors.Black ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
      />
    </label>
    <label>
      <input
        type="checkbox"
        value="Red"
        checked={colors.Red}
        onChange={onChange}
      />
      <i
        className="ms ms-cost ms-r"
        style={!colors.Red ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
      />
    </label>
    <label>
      <input
        type="checkbox"
        value="Green"
        checked={colors.Green}
        onChange={onChange}
      />
      <i
        className="ms ms-cost ms-g"
        style={!colors.Green ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
      />
    </label>
    <label>
      <input
        type="checkbox"
        value="Colorless"
        checked={colors.Colorless}
        onChange={onChange}
      />
      <i
        className="ms ms-cost ms-c"
        style={!colors.Colorless ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
      />
    </label>
  </div>
)

ColorFilter.propTypes = {
  colors: PropTypes.object,
  onChange: PropTypes.func
}

export default ColorFilter
