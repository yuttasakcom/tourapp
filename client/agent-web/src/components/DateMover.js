import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'

import DatePicker from './DatePicker'

class DateMover extends PureComponent {
  render() {
    const { date, onDateChange } = this.props
    return (
      <div>
        <Button
          bsStyle="warning"
          onClick={() => onDateChange(date.subtract(1, 'days').clone())}
        >
          {'<<<'} Prev
        </Button>
        <DatePicker
          date={date}
          isOutsideRange={() => false}
          onDateChange={onDateChange}
        />
        <Button
          bsStyle="info"
          onClick={() => onDateChange(date.add(1, 'days').clone())}
        >
          Next >>>
        </Button>
      </div>
    )
  }
}

export default DateMover
