import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Radio, ControlLabel, Checkbox, Button } from 'react-bootstrap'
import { toggleSetting, changeCardDetailsPopupDelay, restoreDefaultSettings } from 'store/settings'
import { Flex } from 'styled'

const mapStateToProps = ({ settings }) => ({ settings })

const mapDispatchToProps = {
  toggleSetting,
  changeCardDetailsPopupDelay,
  restoreDefaultSettings
}

class SettingsView extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    toggleSetting: PropTypes.func.isRequired,
    changeCardDetailsPopupDelay: PropTypes.func.isRequired,
    restoreDefaultSettings: PropTypes.func.isRequired
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
    const { restoreDefaultSettings, toggleSetting, settings } = this.props
    const { cardModalAnimation, cardHoverAnimation } = settings

    return (
      <Flex column alignItems="center">
        <Flex column>
          <FormGroup>
            <ControlLabel>Animations and transitions</ControlLabel>
            <Checkbox
              checked={cardModalAnimation}
              onChange={e => toggleSetting('cardModalAnimation', e.target.checked)}
            >
              Card modal animation
            </Checkbox>
            <Checkbox
              checked={cardHoverAnimation}
              onChange={e => toggleSetting('cardHoverAnimation', e.target.checked)}
            >
              3D card animation
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Collection lock status</ControlLabel>
            <Checkbox
              checked={cardModalAnimation}
              onChange={e => toggleSetting('cardModalAnimation', e.target.checked)}
            >
              Locked at start
            </Checkbox>
            <Checkbox
              checked={cardHoverAnimation}
              onChange={e => toggleSetting('cardHoverAnimation', e.target.checked)}
            >
              Unlocked at start
            </Checkbox>
            <Checkbox
              checked={cardHoverAnimation}
              onChange={e => toggleSetting('cardHoverAnimation', e.target.checked)}
            >
              As I left it
            </Checkbox>
          </FormGroup>
          {this.renderCardDetailsPopupDelaySettings()}
          <Flex justifyContent="flex-end">
            <Button onClick={restoreDefaultSettings}>
              Default settings
            </Button>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
