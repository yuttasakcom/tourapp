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
    const { visibilityFilter, setBookingsVisibilityFilter } = this.props
    return (
      <div className="pull-right">
        <ul className="nav nav-pills nav-pills-primary" role="tablist">
          <FilterLink
            icon="alarm"
            text="Waiting"
            active={visibilityFilter === waiting}
            onClick={() => setBookingsVisibilityFilter(waiting)}
          />
          <FilterLink
            icon="done"
            text="Readed"
            active={visibilityFilter === readed}
            onClick={() => setBookingsVisibilityFilter(readed)}
          />
          <FilterLink
            icon="done_all"
            text="Accepted"
            active={visibilityFilter === accepted}
            onClick={() => setBookingsVisibilityFilter(accepted)}
          />
          <FilterLink
            icon="check_circle"
            text="Completed"
            active={visibilityFilter === completed}
            onClick={() => setBookingsVisibilityFilter(completed)}
          />
          <FilterLink
            icon="clear"
            text="Rejected"
            active={visibilityFilter === rejected}
            onClick={() => setBookingsVisibilityFilter(rejected)}
          />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ booking: { visibilityFilter } }) => {
  return {
    visibilityFilter
  }
}

export default connect(mapStateToProps, actions)(FilterLinks)
