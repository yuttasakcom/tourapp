import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

class PrivateRoute extends PureComponent {
  render() {
    const { component: Component, authenticated, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          authenticated
            ? <Component {...props} />
            : <Redirect
                to={{ pathname: '/signin', state: { from: props.location } }}
              />}
      />
    )
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
