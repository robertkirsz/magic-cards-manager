import React, { Component } from 'react'

class ColorFilter extends Component {
  constructor () {
    super()

    this.state = {
      mana: {
        'White': true,
        'Blue': true,
        'Black': true,
        'Red': true,
        'Green': true,
        'Colorless': true
      }
    }
  }

  render () {
    return (
      <div className="mana-checkboxes">
        <label>
          <input
            type="checkbox"
            value="White"
            checked={this.state.mana.White}
            onChange={this._handleChangeMana}
          />
          <i
            className="ms ms-cost ms-w"
            style={!this.state.mana.White ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
          />
        </label>
        <label>
          <input
            type="checkbox"
            value="Blue"
            checked={this.state.mana.Blue}
            onChange={this._handleChangeMana}
          />
          <i
            className="ms ms-cost ms-u"
            style={!this.state.mana.Blue ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
          />
        </label>
        <label>
          <input
            type="checkbox"
            value="Black"
            checked={this.state.mana.Black}
            onChange={this._handleChangeMana}
          />
          <i
            className="ms ms-cost ms-b"
            style={!this.state.mana.Black ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
          />
        </label>
        <label>
          <input
            type="checkbox"
            value="Red"
            checked={this.state.mana.Red}
            onChange={this._handleChangeMana}
          />
          <i
            className="ms ms-cost ms-r"
            style={!this.state.mana.Red ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
          />
        </label>
        <label>
          <input
            type="checkbox"
            value="Green"
            checked={this.state.mana.Green}
            onChange={this._handleChangeMana}
          />
          <i
            className="ms ms-cost ms-g"
            style={!this.state.mana.Green ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
          />
        </label>
        <label>
          <input
            type="checkbox"
            value="Colorless"
            checked={this.state.mana.Colorless}
            onChange={this._handleChangeMana}
          />
          <i
            className="ms ms-cost ms-c"
            style={!this.state.mana.Colorless ? { opacity: 0.4, backgroundColor: 'transparent' } : {}}
          />
        </label>
      </div>
    )
  }
}

export default ColorFilter
