import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Card from '../../components/Card'

class Landing extends React.PureComponent {
  render() {
    const { authenticated, location, role } = this.props
    const { from } = location.state || {
      from: {
        pathname: `/${role === 'company' ? 'companies' : 'agents'}/dashboard`
      }
    }
    if (authenticated) {
      return <Redirect to={from} />
    }
    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <Helmet>
          <title>Tour App</title>
        </Helmet>
        <Card title="Landing Page">
          <div className="row">
            <div className="text-center">
              <Link className="btn btn-info" to="/companies">
                Company
              </Link>
              <Link className="btn btn-success" to="/agents">
                Agent
              </Link>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated, user: { role } } }) => ({
  authenticated,
  role
})

export default connect(mapStateToProps)(Landing)
