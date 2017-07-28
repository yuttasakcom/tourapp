import { filter } from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import FilterLink from './FilterLink'
import * as actions from '../../../actions'
import {
  waiting,
  readed,
  accepted,
  completed,
  rejected
} from '../../../actions/bookingStatus'

class FilterLinks extends PureComponent {
  render() {
    const { status, bookings, setBookingsStatusVisibilityFilter } = this.props
    console.log(this.props.booking)
    return (
      <ul className="nav nav-pills nav-pills-primary pull-right" role="tablist">
        <FilterLink
          icon="alarm"
          text="Waiting"
          style={{ color: '#5882FA' }}
          active={status === waiting}
          total={filter(bookings, ({ status }) => status === waiting).length}
          onClick={() => setBookingsStatusVisibilityFilter(waiting)}
        />
        <FilterLink
          icon="done"
          text="Readed"
          style={{ color: '#0000FF' }}
          active={status === readed}
          total={filter(bookings, ({ status }) => status === readed).length}
          onClick={() => setBookingsStatusVisibilityFilter(readed)}
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
  manageBooking: { visibilityFilter: { status }, bookings }
}) => {
  return {
    status,
    bookings
  }
}

export default connect(mapStateToProps, actions)(FilterLinks)
