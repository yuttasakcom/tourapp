import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../../components/DateMover'
import actions from '../../../../state/ducks/actions'

class FilterDate extends PureComponent {
  render() {
    const { date, fetchBookings } = this.props
    return <DateMover date={date} onDateChange={fetchBookings} />
  }
}

const mapStateToProps = ({
  company: { booking: { visibilityFilter: { date } } }
}) => ({
  date
})

export default connect(mapStateToProps, actions.company.booking)(FilterDate)
