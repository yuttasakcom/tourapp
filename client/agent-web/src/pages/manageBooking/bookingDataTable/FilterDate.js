import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import DatePicker from '../../../components/DatePicker'
import * as actions from '../../../actions'

class FilterDate extends PureComponent {
  render() {
    const { date, setBookingsDateVisibilityFilter } = this.props
    return (
      <div>
        <Button
          bsStyle="warning"
          onClick={() =>
            setBookingsDateVisibilityFilter(date.subtract(1, 'days').clone())}
        >
          {'<<<'} Prev
        </Button>
        <DatePicker
          date={date}
          isOutsideRange={() => false}
          onDateChange={setBookingsDateVisibilityFilter}
        />
        <Button
          bsStyle="info"
          onClick={() =>
            setBookingsDateVisibilityFilter(date.add(1, 'days').clone())}
        >
          Next >>>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({
  manageBooking: { visibilityFilter: { date } }
}) => ({ date })

export default connect(mapStateToProps, actions)(FilterDate)
