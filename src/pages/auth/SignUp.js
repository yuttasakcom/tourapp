import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AuthForm from './AuthForm'
import * as actions from '../../actions'

class SignUp extends PureComponent {
  onSubmit = values => {
    this.props.signUp(values)
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
        title="Sign Up"
        description="sign up description"
        onSubmit={this.onSubmit}
      />
    )
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated }
}

export default connect(mapStateToProps, actions)(SignUp)
