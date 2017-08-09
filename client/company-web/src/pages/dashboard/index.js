import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Table from './Table'
import Card from '../../components/Card'
import * as actions from '../../actions'

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.fetchDashboard()
  }

  renderDashboard() {
    const { bookingsSummaries } = this.props
    return bookingsSummaries.map(bookingsSummary => {
      return (
        <div className="col-md-4">
          <Table bookingsSummary={bookingsSummary} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Dashboard" description="Show Dashboard">
          <div className="row">
            {this.renderDashboard()}
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ dashboard: { bookingsSummaries } }) => ({
  bookingsSummaries
})

export default connect(mapStateToProps, actions)(Dashboard)
