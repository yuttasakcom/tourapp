import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../components/DateMover'
import actions from '../../../state/ducks/actions'

class FilterDate extends PureComponent {
  render() {
    const { date, pkg, fetchBookingsHotelsSummaryAndBusPaths } = this.props
    return (
      <DateMover
        date={date}
        onDateChange={value =>
          fetchBookingsHotelsSummaryAndBusPaths({ date: value, pkg })}
      />
    )
  }
}

const mapStateToProps = ({
  company: { printBusPath: { visibilityFilter: { date, pkg } } }
}) => ({
  date,
  pkg
})

export default connect(mapStateToProps, actions.company.printBusPath)(
  FilterDate
)
