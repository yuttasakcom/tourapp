import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DatePicker from '../../../components/DatePicker'

class FilterDate extends PureComponent {
  render() {
    const { date } = this.props
    return (
      <DatePicker
        date={date}
        isOutsideRange={() => false}
        onDateChange={() => ''}
      />
    )
  }
}

const mapStateToProps = ({
  manageBooking: { visibilityFilter: { date } }
}) => ({ date })

export default connect(mapStateToProps)(FilterDate)
