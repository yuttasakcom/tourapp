import React, { PureComponent } from 'react'

import Card from '../../components/Card'

class Dashboard extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Dashboard" description="Show Dashboard">
          <div className="row" />
        </Card>
      </div>
    )
  }
}

export default Dashboard
