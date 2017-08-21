import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../components/DateMover'
import * as actions from '../../actions'

class FilterDate extends PureComponent {
  componentDidMount() {
    this.props.fetchBookingsHotelsSummaryAndBusPaths(this.props.date)
  }

  render() {
    const { date, fetchBookingsHotelsSummaryAndBusPaths } = this.props
    return (
      <DateMover
        date={date}
        onDateChange={fetchBookingsHotelsSummaryAndBusPaths}
      />
    )
  }
}

const mapStateToProps = ({ printBusPath: { visibilityFilter: { date } } }) => ({
  date
})

export default connect(mapStateToProps, actions)(FilterDate)
