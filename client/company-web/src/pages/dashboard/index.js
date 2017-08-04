import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import SimplePieChart from './SimplePieChart'

class Dashboard extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Dashboard" description="Show Dashboard">
          <div className="row">
            <div className="col-md-12">
              <SimplePieChart />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default Dashboard
