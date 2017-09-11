import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../components/DateMover'
import * as actions from '../../../actions/companies'

class FilterDate extends PureComponent {
  render() {
    const { date, pkg, fetchBookingsHotelsSummaryAndBusPaths } = this.props
    return (
      <DateMover
        date={date}
        onDateChange={value =>
          fetchBookingsHotelsSummaryAndBusPaths(value, pkg)}
      />
    )
  }
}

const mapStateToProps = ({
  printBusPath: { visibilityFilter: { date, pkg } }
}) => ({
  date,
  pkg
})

export default connect(mapStateToProps, actions)(FilterDate)
