import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../components/DateMover'
import * as actions from '../../../actions'

class FilterDate extends PureComponent {
  render() {
    const { date, setBookingsDateVisibilityFilter } = this.props
    return (
      <DateMover date={date} onDateChange={setBookingsDateVisibilityFilter} />
    )
  }
}

const mapStateToProps = ({ booking: { visibilityFilter: { date } } }) => ({
  date
})

export default connect(mapStateToProps, actions)(FilterDate)
