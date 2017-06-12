import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Title extends PureComponent {
  render() {
    return <a className="navbar-brand">{this.props.title}</a>
  }
}

const mapStateToProps = state => {
  return { title: state.router.location.pathname }
}

export default connect(mapStateToProps)(Title)
