import React, { Component, PropTypes } from 'react'
import { CardDetails } from 'components'

class CardDetailsPopup extends Component {
  static propTypes = {
    cardData: PropTypes.object,
    show: PropTypes.bool,
    coordinates: PropTypes.object
  }

  state = {
    popupVisible: false,
    popupPosition: {}
  }

  timeout = null

  componentWillReceiveProps (nextProps) {
    // On mouse move...
    if (nextProps.coordinates) {
      clearTimeout(this.timeout)
      // If popup is visible
      if (this.state.popupVisible) {
        // Hide it
        this.hideDetailsPopup()
      // If popup is hidden
      } else {
        // Show it
        this.timeout = setTimeout(() => {
          this.showDetailsPopup()
        }, 1500)
      }
    }

    if (this.props.show && !nextProps.show) this.hideDetailsPopup()
  }

  showDetailsPopup () {
    this.setState({ popupVisible: true })
    this.updateDetailsPopupPosition(this.props.coordinates)
  }

  hideDetailsPopup () {
    clearTimeout(this.timeout)
    this.setState({ popupVisible: false })
  }

  updateDetailsPopupPosition = ({ pageX, pageY }) => {
    if (!this.state.popupVisible) return

    const offset = 10
    const popupWidth = this.refs.detailsPopup.clientWidth
    const popupHeight = this.refs.detailsPopup.clientHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    let top = pageY + offset
    let left = pageX + offset

    if (pageY + popupHeight > windowHeight) top = top - popupHeight
    if (pageX + popupWidth > windowWidth) left = left - popupWidth

    this.setState({ popupPosition: { top, left } })
  }

  render () {
    const { cardData } = this.props
    const { popupPosition, popupVisible } = this.state

    if (!popupVisible) return null

    return (
      <div
        className="card__details-popup"
        style={popupPosition}
        ref="detailsPopup"
      >
        <CardDetails card={cardData} />
      </div>
    )
  }
}

export default CardDetailsPopup
