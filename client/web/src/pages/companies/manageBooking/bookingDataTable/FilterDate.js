import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../../components/DateMover'
import actions from '../../../../state/ducks/actions'

class FilterDate extends PureComponent {
  render() {
    const { date, fetchBookings, setBookingsDateVisibilityFilter } = this.props
    return (
      <DateMover
        date={date}
        onDateChange={date => {
          setBookingsDateVisibilityFilter(date)
          fetchBookings()
        }}
      />
    )
  }
}

const mapStateToProps = ({
  company: { booking: { visibilityFilter: { date } } }
}) => ({
  date
})

export default connect(mapStateToProps, actions.company.booking)(FilterDate)
