import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Radio, ControlLabel, Checkbox } from 'react-bootstrap'
import { toggleSetting, changeCardDetailsPopupDelay } from 'store/settings'

const mapStateToProps = ({ settings }) => ({ settings })

const mapDispatchToProps = {
  toggleSetting,
  changeCardDetailsPopupDelay
}

class SettingsView extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    toggleSetting: PropTypes.func.isRequired,
    changeCardDetailsPopupDelay: PropTypes.func.isRequired
  }

  cardDetailsPopupDelayChange = e => {
    this.props.changeCardDetailsPopupDelay(e.target.value)
  }

  renderCardDetailsPopupDelaySettings = () => {
    const options = [
      { id: 0, value: 0, title: 'No delay' },
      { id: 1, value: 1000, title: '1 second' },
      { id: 2, value: 1500, title: '1.5 second' },
      { id: 3, value: 2000, title: '2 seconds' },
      { id: 4, value: false, title: 'Disabled' }
    ]

    return (
      <FormGroup>
        <ControlLabel>Card details popup delay</ControlLabel>
        {
          options.map(({ id, value, title }) => (
            <Radio
              key={id}
              name="cardDetailsPopupDelay"
              value={value}
              checked={this.props.settings.cardDetailsPopupDelay === value}
              onChange={this.cardDetailsPopupDelayChange}
            >
              {title}
            </Radio>
          ))
        }
      </FormGroup>
    )
  }

  render () {
    const { cardModalAnimation, cardHoverAnimation } = this.props.settings

    return (
      <div>
        <Checkbox
          checked={cardModalAnimation}
          onChange={e => { this.props.toggleSetting('cardModalAnimation', e.target.checked) }}
        >
          Card modal animation
        </Checkbox>
        <Checkbox
          checked={cardHoverAnimation}
          onChange={e => { this.props.toggleSetting('cardHoverAnimation', e.target.checked) }}
        >
          3D card animation
        </Checkbox>
        {this.renderCardDetailsPopupDelaySettings()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
