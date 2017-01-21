import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactTimeout from 'react-timeout' // Prevents errors when updating unmounted component
// TODO: maybe I can just clear timeout on willUnmount and do not update stat if timeout is null
import _ from 'lodash'
import { addCard, removeCard } from 'store/myCards'
import cardBack from 'components/assets/card_back.jpg'
import cn from 'classnames'

let bd
let htm

export class Card extends Component {
  static propTypes = {
    mainCard: PropTypes.object,
    variantCard: PropTypes.object,
    setIcon: PropTypes.bool,
    showCount: PropTypes.bool,
    showAdd: PropTypes.bool,
    showRemove: PropTypes.bool,
    addCard: PropTypes.func,
    removeCard: PropTypes.func,
    onClick: PropTypes.func,
    setTimeout: PropTypes.func
  }

  constructor () {
    super()

    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.animate = this.animate.bind(this)
    this.processMovement = this.processMovement.bind(this)
    this.processEnter = this.processEnter.bind(this)
    this.processExit = this.processExit.bind(this)

    this.state = {
      animations: []
    }
  }

  componentDidMount () {
    bd = document.getElementsByTagName('body')[0]
    htm = document.getElementsByTagName('html')[0]

    const w = this.cardElement.clientWidth || this.cardElement.offsetWidth || this.cardElement.scrollWidth
    this.cardElement.style.transform = 'perspective(' + w * 3 + 'px)'
  }

  addCard () {
    this.props.addCard(this.props.mainCard, this.props.variantCard)
    this.animate('add')
  }

  removeCard () {
    this.props.removeCard(this.props.mainCard, this.props.variantCard)
    this.animate('remove')
  }

  animate (animationType) {
    const id = Date.now()
    const animations = [...this.state.animations]

    animations.push({ id, animationType })

    this.setState({ animations })

    this.props.setTimeout(() => {
      let animations = [...this.state.animations]
      const index = _.findIndex(animations, { id })

      animations = [
        ...animations.slice(0, index),
        ...animations.slice(index + 1)
      ]

      this.setState({ animations })
    }, 1000)
  }

  processMovement (e) {
    const touchEnabled = false
    const elem = this.cardElement
    const layers = [this.cardElementLayer1, this.cardElementLayer2]
    const totalLayers = 2
    const shine = this.cardElementShine

    const bdst = bd.scrollTop || htm.scrollTop
    const bdsl = bd.scrollLeft
    const pageX = (touchEnabled) ? e.touches[0].pageX : e.pageX
    const pageY = (touchEnabled) ? e.touches[0].pageY : e.pageY
    const offsets = elem.getBoundingClientRect()
    const w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth
    const h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight
    const wMultiple = 320 / w
    const offsetX = 0.52 - (pageX - offsets.left - bdsl) / w
    const offsetY = 0.52 - (pageY - offsets.top - bdst) / h
    const dy = (pageY - offsets.top - bdst) - h / 2
    const dx = (pageX - offsets.left - bdsl) - w / 2
    const yRotate = (offsetX - dx) * (0.07 * wMultiple)
    const xRotate = (dy - offsetY) * (0.1 * wMultiple)
    let imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)'
    const arad = Math.atan2(dy, dx)
    let angle = arad * 180 / Math.PI - 90

    if (angle < 0) angle = angle + 360

    if (elem.firstChild.className.indexOf(' over') !== -1) imgCSS += ' scale3d(1.07,1.07,1.07)'

    elem.firstChild.style.transform = imgCSS

    shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)'
    shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)'

    let revNum = totalLayers
    for (let ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)'
      revNum--
    }
  }

  processEnter (e) {
    const elem = this.cardElement

    elem.firstChild.className += ' over'
  }

  processExit (e) {
    const elem = this.cardElement
    const layers = [this.cardElementLayer1, this.cardElementLayer2]
    const totalLayers = 2
    const shine = this.cardElementShine

    const container = elem.firstChild

    container.className = container.className.replace(' over', '')
    container.style.transform = ''
    shine.style.cssText = ''

    for (let ly = 0; ly < totalLayers; ly++) layers[ly].style.transform = ''
  }

  render () {
    const { mainCard, variantCard, setIcon, showCount, showAdd, showRemove, onClick } = this.props
    const { animations } = this.state

    const cardData = variantCard || mainCard
    const numberOfCards = <span className="card__count">{cardData.cardsInCollection}</span>
    const addRemoveControls = (
      <div className="card__add-remove-buttons">
        {showAdd &&
          <button onClick={this.addCard}>
            <span className="fa fa-plus-circle" />
          </button>
        }
        {showRemove &&
          <button onClick={this.removeCard}>
            <span className="fa fa-minus-circle" />
          </button>
        }
      </div>
    )

    return (
      <div
        className="card atvImg"
        onClick={onClick}
        onMouseMove={e => { this.processMovement(e) }}
        onMouseEnter={e => { this.processEnter(e) }}
        onMouseLeave={e => { this.processExit(e) }}
        ref={node => { this.cardElement = node }}
      >
        <div className="atvImg-container">
          <div className="atvImg-shadow" />
          <div className="atvImg-layers">
            <div
              className="atvImg-rendered-layer"
              style={{ backgroundImage: `url(${cardData.image}), url(${cardBack})` }}
              ref={node => { this.cardElementLayer1 = node }}
             />
            <div className="atvImg-rendered-layer card__content"
              ref={node => { this.cardElementLayer2 = node }}

              >
              {setIcon && <span className={cn('card__set-icon', cardData.setIcon)} />}
              {showCount && numberOfCards}
              {(showAdd || showRemove) && addRemoveControls}
              {
                animations.map((o) => (
                  o.animationType === 'add'
                    ? <span key={o.id} className="card__count-animation card__count-animation--add">+1</span>
                    : <span key={o.id} className="card__count-animation card__count-animation--remove">-1</span>
                ))
              }
            </div>
          </div>
          <div className="atvImg-shine" ref={node => { this.cardElementShine = node }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { addCard, removeCard }

export default ReactTimeout(connect(mapStateToProps, mapDispatchToProps)(Card))
