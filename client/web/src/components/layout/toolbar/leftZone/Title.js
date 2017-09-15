import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import startCase from 'lodash/startCase'

class Title extends PureComponent {
  render() {
    return (
      <a className="navbar-brand">
        {this.props.title}
      </a>
    )
  }
}

const mapStateToProps = state => {
  return { title: startCase(state.router.location.pathname) }
}

export default connect(mapStateToProps)(Title)
