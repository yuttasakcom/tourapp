import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AuthForm from './AuthForm'
import * as actions from '../../actions'

class SignIn extends PureComponent {
  onSubmit = values => {
    this.props.signIn(values)
  }

  render() {
    const { location, authenticated } = this.props

    const { from } = location.state || {
      from: { pathname: '/dashboard' }
    }

    if (authenticated) {
      return <Redirect to={from} />
    }

    return (
      <AuthForm
        title="Sign In"
        description="sign in description"
        onSubmit={this.onSubmit}
      />
    )
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated }
}

export default connect(mapStateToProps, actions)(SignIn)
