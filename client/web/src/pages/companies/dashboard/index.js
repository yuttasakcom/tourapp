import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Table from './Table'
import Card from '../../../components/Card'
import actions from '../../../state/ducks/actions'

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.fetchDashboard()
  }

  renderDashboard() {
    const { bookingsSummaries } = this.props
    return bookingsSummaries.map((bookingsSummary, index) => {
      return (
        <div key={index} className="col-md-4 col-sm-6">
          <Table
            description={`วันที่ ${moment()
              .add(index, 'day')
              .format('DD/MM/YYYY')}`}
            bookingsSummary={bookingsSummary}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Dashboard" description="Show Dashboard">
          <div className="row">{this.renderDashboard()}</div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({
  company: { dashboard: { bookingsSummaries } }
}) => ({
  bookingsSummaries
})

export default connect(mapStateToProps, actions.company.dashboard)(Dashboard)
