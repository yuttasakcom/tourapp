import React, { PureComponent } from 'react'
import { SingleDatePicker } from 'react-dates'

class DatePicker extends PureComponent {
  state = {
    focused: false
  }

  render() {
    const { date, onDateChange, isOutsideRange } = this.props
    return (
      <SingleDatePicker
        isOutsideRange={isOutsideRange}
        date={date}
        displayFormat="DD/MM/YYYY"
        onDateChange={onDateChange}
        focused={this.state.focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
      />
    )
  }
}

export default DatePicker
