import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Auth from '../../../components/auth'
import * as actions from '../../../actions'

class AgentAuth extends React.PureComponent {
  onSignIn = values => {
    this.props.signIn('agent', values)
  }

  onSignUp = values => {
    this.props.signUp('agent', values)
  }

  render() {
    const { authenticated, location } = this.props
    const { from } = location.state || {
      from: { pathname: '/agents/dashboard' }
    }
    if (authenticated) {
      return <Redirect to={from} />
    }
    return <Auth onSignIn={this.onSignIn} onSignUp={this.onSignUp} />
  }
}

const mapStateToProps = ({ auth: { authenticated, user } }) => ({
  authenticated: authenticated && user.role === 'agent'
})

export default connect(mapStateToProps, actions)(AgentAuth)
