import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Table from './Table'
import Card from '../../components/Card'
import FilterDate from './FilterDate'
import { openReport } from '../../helpers'

class BookingSummary extends PureComponent {
  openReport = () => {
    const { date } = this.props
    const dateEnd = moment(date).add(1, 'days')
    openReport(`bookingsSummary?dateStart=${date}&dateEnd=${dateEnd}`)
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Booking Summary" description="Show Booking Summary">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={this.openReport}
              >
                Print
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <FilterDate />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({
  bookingSummary: { visibilityFilter: { date } }
}) => ({ date })

export default connect(mapStateToProps)(BookingSummary)
