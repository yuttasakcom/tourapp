import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DatePicker from '../../../components/DatePicker'
import * as actions from '../../../actions'

class FilterDate extends PureComponent {
  render() {
    const { date, setBookingsDateVisibilityFilter } = this.props
    return (
      <DatePicker
        date={date}
        isOutsideRange={() => false}
        onDateChange={setBookingsDateVisibilityFilter}
      />
    )
  }
}

const mapStateToProps = ({
  manageBooking: { visibilityFilter: { date } }
}) => ({ date })

export default connect(mapStateToProps, actions)(FilterDate)
