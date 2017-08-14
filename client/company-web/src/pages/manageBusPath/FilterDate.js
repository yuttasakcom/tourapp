import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../components/DateMover'
import * as actions from '../../actions'

class FilterDate extends PureComponent {
  componentDidMount() {
    this.props.fetchBookingsHotelsSummary(this.props.date)
  }

  render() {
    const { date, fetchBookingsHotelsSummary } = this.props
    return <DateMover date={date} onDateChange={fetchBookingsHotelsSummary} />
  }
}

const mapStateToProps = ({ busPath: { visibilityFilter: { date } } }) => ({
  date
})

export default connect(mapStateToProps, actions)(FilterDate)
