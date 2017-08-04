import React, { PureComponent } from 'react'
import { DateRangePicker } from 'react-dates'

class MyDateRangePicker extends PureComponent {
  state = {
    focusedInput: null
  }

  render() {
    return (
      <DateRangePicker
        {...this.props}
        isOutsideRange={() => false}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
      />
    )
  }
}

export default MyDateRangePicker
