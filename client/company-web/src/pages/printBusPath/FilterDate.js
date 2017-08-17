import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import DateMover from '../../components/DateMover'
import * as actions from '../../actions'

class FilterDate extends PureComponent {
  componentDidMount() {
    this.props.fetchBookingsHotelsSummaryAndBusPaths(this.props.date)
  }

  render() {
    const { date, fetchBookingsHotelsSummaryAndBusPaths } = this.props
    return (
      <div className="col-md-4 col-sm-4">
        <DateMover
          date={date}
          onDateChange={fetchBookingsHotelsSummaryAndBusPaths}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ printBusPath: { visibilityFilter: { date } } }) => ({
  date
})

export default connect(mapStateToProps, actions)(FilterDate)
