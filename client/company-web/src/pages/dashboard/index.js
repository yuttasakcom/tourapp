import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import * as actions from '../../actions'

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.fetchDashboard()
  }

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

export default connect(null, actions)(Dashboard)
