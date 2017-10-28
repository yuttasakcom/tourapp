import React from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../../components/DateMover'
import actions from '../../../../state/ducks/actions'

class FilterDate extends React.PureComponent {
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
  agent: { manageBooking: { visibilityFilter: { date } } }
}) => ({ date })

export default connect(mapStateToProps, actions.agent.manageBooking)(FilterDate)
