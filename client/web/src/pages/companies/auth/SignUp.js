import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import AuthForm from './AuthForm'
import * as actions from '../../../actions'

class SignUp extends PureComponent {
  onSubmit = values => {
    this.props.signUp('company', values)
  }

  render() {
    return (
      <AuthForm
        location={this.props.location}
        title="Sign Up"
        description="sign up description"
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default connect(null, actions)(SignUp)
