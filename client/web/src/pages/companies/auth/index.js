import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Auth from '../../../components/auth'
import * as actions from '../../../actions'

class CompanyAuth extends React.PureComponent {
  onSignIn = values => {
    this.props.signIn('company', values)
  }

  render() {
    const { authenticated, location } = this.props
    const { from } = location.state || {
      from: { pathname: '/companies/dashboard' }
    }
    if (authenticated) {
      return <Redirect to={from} />
    }
    return <Auth />
  }
}

const mapStateToProps = ({ auth: { authenticated, user } }) => ({
  authenticated: authenticated && user.role === 'company'
})

export default connect(mapStateToProps, actions)(CompanyAuth)
