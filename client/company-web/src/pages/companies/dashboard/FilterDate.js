import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import MyDateRangePicker from '../../../components/MyDateRangePicker'
import * as actions from '../../../actions/companies'

class FilterDate extends PureComponent {
  state = {
    startDate: moment().startOf('day'),
    endDate: moment().clone().add(1, 'days')
  }

  componentDidMount() {
    this.props.fetchBookingsDashboard(this.state.startDate, this.state.endDate)
  }

  render() {
    const { startDate, endDate } = this.state
    const { fetchBookingsDashboard } = this.props
    return (
      <MyDateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDatesChange={({ startDate, endDate }) => {
          this.setState({ startDate, endDate })
          if (startDate && endDate) {
            fetchBookingsDashboard(startDate, endDate)
          }
        }}
      />
    )
  }
}

export default connect(null, actions)(FilterDate)
