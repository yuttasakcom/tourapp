import React, { PureComponent } from 'react'

import Card from '../../components/Card'
import Table from './Table'

class Dashboard extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Dashboard" description="Show Dashboard">
          <Table />
        </Card>
      </div>
    )
  }
}

export default Dashboard
