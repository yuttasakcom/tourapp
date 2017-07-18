import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { titleCase } from 'change-case'

class Title extends PureComponent {
  render() {
    return <a className="navbar-brand">{this.props.title}</a>
  }
}

const mapStateToProps = state => {
  return { title: titleCase(state.router.location.pathname) }
}

export default connect(mapStateToProps)(Title)
