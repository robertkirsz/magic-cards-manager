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
    if (!this.props.show && nextProps.show) this.showDetailsPopup()
    if (this.props.show && !nextProps.show) this.hideDetailsPopup()
    if (nextProps.coordinates) this.updateDetailsPopupPosition(nextProps.coordinates)
  }

  showDetailsPopup () {
    this.timeout = setTimeout(() => {
      this.setState({ popupVisible: true })
    }, 1000)
  }

  hideDetailsPopup () {
    clearTimeout(this.timeout)
    this.setState({ popupVisible: false })
  }

  updateDetailsPopupPosition = ({ pageX, pageY, cardX, cardY }) => {
    if (!this.state.popupVisible) return

    const offset = 10
    const popupWidth = this.refs.detailsPopup.clientWidth
    const popupHeight = this.refs.detailsPopup.clientHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    let top = pageY - cardY + offset
    let left = pageX - cardX + offset

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
