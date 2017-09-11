import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import AuthForm from './AuthForm'
import * as actions from '../../actions'

class SignIn extends PureComponent {
  onSubmit = values => {
    this.props.signIn(values)
  }

  render() {
    return (
      <AuthForm
        location={this.props.location}
        title="Sign In"
        description="sign in description"
        onSubmit={this.onSubmit}
        initialValues={{ email: 'company1@company.com', password: '1234' }}
      />
    )
  }
}

export default connect(null, actions)(SignIn)
