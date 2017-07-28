import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import DatePicker from '../../../components/DatePicker'
import * as actions from '../../../actions'

class FilterDate extends PureComponent {
  render() {
    const { date, setBookingsDateVisibilityFilter } = this.props
    return (
      <div className="row">
        <Button bsStyle="warning">
          {'<<<'} Prev
        </Button>
        <DatePicker
          date={date}
          isOutsideRange={() => false}
          onDateChange={setBookingsDateVisibilityFilter}
        />
        <Button bsStyle="info">Next >>></Button>
      </div>
    )
  }
}

const mapStateToProps = ({
  manageBooking: { visibilityFilter: { date } }
}) => ({ date })

export default connect(mapStateToProps, actions)(FilterDate)
