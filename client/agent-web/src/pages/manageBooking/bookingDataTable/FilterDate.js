import React, { PureComponent } from 'react'
import moment from 'moment'

import DatePicker from '../../../components/DatePicker'

class FilterDate extends PureComponent {
  render() {
    return <DatePicker date={moment()} onDateChange={() => ''} />
  }
}

export default FilterDate
