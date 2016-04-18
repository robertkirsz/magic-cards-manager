import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as applicationActions } from 'redux/modules/application'

const mapStateToProps = (state) => ({
  database: state.database,
  application: state.application
})

const mapDispatchToProps = (dispatch) => ({
  applicationActions: bindActionCreators(applicationActions, dispatch)
})

class Header extends React.Component {
  static propTypes = {
    database: React.PropTypes.object,
    application: React.PropTypes.object,
    applicationActions: React.PropTypes.object
  }

  constructor () {
    super()
    this.state = {
      databaseStatus: ''
    }
    this._changeOutput = this._changeOutput.bind(this)
    this._lockCollection = this._lockCollection.bind(this)
  }

  _changeOutput (output) {
    this.setState({outputStyle: output})
  }

  _lockCollection () {
    this.props.applicationActions.toggleLock()
  }

  render () {
    console.log('%cHeader', 'color: #3B8686;')
    let databaseStatusClass

    if (this.state.databaseStatus === 'error') {
      databaseStatusClass = 'fa fa-ban text-danger'
    } else if (this.props.database.allCards.length > 0 && this.props.database.allSets.length > 0) {
      databaseStatusClass = 'fa fa-check text-success'
    } else {
      databaseStatusClass = 'fa fa-refresh fa-spin'
    }

    return (
      <header>
        <span>
          Card data <i className={databaseStatusClass} />
        </span>
        <Link to='/'>Home</Link>
        <Link to='/collection'>Collection</Link>
        <i
          className={'lockApplication fa fa-' + (this.props.application.locked ? 'lock' : 'unlock')}
          onClick={this._lockCollection}
        />
      </header>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
