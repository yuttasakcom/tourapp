import React, { PureComponent } from 'react'
import { SingleDatePicker } from 'react-dates'

import 'react-dates/lib/css/_datepicker.css'

class DatePicker extends PureComponent {
  state = {
    focused: false
  }

  render() {
    const { date, onDateChange } = this.props
    return (
      <SingleDatePicker
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
