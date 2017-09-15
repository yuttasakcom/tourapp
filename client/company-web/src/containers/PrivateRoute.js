import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

class PrivateRoute extends PureComponent {
  render() {
    const {
      component: Component,
      userRole,
      authenticated,
      user,
      ...rest
    } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          authenticated && userRole === user.role ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: `/${userRole === 'company'
                  ? 'companies'
                  : 'agents'}/signin`,
                state: { from: props.location }
              }}
            />
          )}
      />
    )
  }
}

const mapStateToProps = ({ auth: { authenticated, user } }) => ({
  authenticated,
  user
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))
