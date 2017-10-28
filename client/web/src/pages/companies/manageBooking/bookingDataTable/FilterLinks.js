import filter from 'lodash/filter'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import FilterLink from '../../../../components/FilterLink'
import actions from '../../../../state/ducks/actions'
import {
  waiting,
  readed,
  accepted,
  completed,
  rejected
} from '../../../../state/utils/bookingStatus'

class FilterLinks extends PureComponent {
  render() {
    const { status, bookings, setBookingsStatusVisibilityFilter } = this.props
    return (
      <ul className="nav nav-pills nav-pills-primary pull-right" role="tablist">
        <FilterLink
          icon="alarm"
          text="Waiting"
          style={{ color: '#5882FA' }}
          active={status === waiting}
          total={
            filter(
              bookings,
              ({ status }) => status === waiting || status === readed
            ).length
          }
          onClick={() => setBookingsStatusVisibilityFilter(waiting)}
        />
        <FilterLink
          icon="done_all"
          text="Accepted"
          style={{ color: '#FF8000' }}
          active={status === accepted}
          total={filter(bookings, ({ status }) => status === accepted).length}
          onClick={() => setBookingsStatusVisibilityFilter(accepted)}
        />
        <FilterLink
          icon="check_circle"
          text="Completed"
          style={{ color: '#3ADF00' }}
          active={status === completed}
          total={filter(bookings, ({ status }) => status === completed).length}
          onClick={() => setBookingsStatusVisibilityFilter(completed)}
        />
        <FilterLink
          icon="clear"
          text="Rejected"
          style={{ color: '#FF0040' }}
          active={status === rejected}
          total={filter(bookings, ({ status }) => status === rejected).length}
          onClick={() => setBookingsStatusVisibilityFilter(rejected)}
        />
      </ul>
    )
  }
}

const mapStateToProps = ({
  company: { booking: { visibilityFilter: { status }, bookings } }
}) => {
  return {
    status,
    bookings
  }
}

export default connect(mapStateToProps, actions.company.booking)(FilterLinks)
