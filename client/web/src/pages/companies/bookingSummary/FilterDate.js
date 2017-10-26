import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../../components/DateMover'
import actions from '../../../state/ducks/actions'

class FilterDate extends PureComponent {
  render() {
    const { date, fetchBookingSummary } = this.props
    return <DateMover date={date} onDateChange={fetchBookingSummary} />
  }
}

const mapStateToProps = ({
  company: { bookingSummary: { visibilityFilter: { date } } }
}) => ({
  date
})

export default connect(mapStateToProps, actions.company.bookingSummary)(
  FilterDate
)
