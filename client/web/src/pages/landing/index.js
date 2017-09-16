import React from 'react'
import { Link } from 'react-router-dom'

import Card from '../../components/Card'

class Landing extends React.PureComponent {
  render() {
    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
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

export default Landing
