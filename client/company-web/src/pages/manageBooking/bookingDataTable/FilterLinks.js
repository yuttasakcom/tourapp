import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import FilterLink from './FilterLink'
import * as actions from '../../../actions'
import {
  waiting,
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
            style={{ color: '#5882FA' }}
            active={visibilityFilter === waiting}
            onClick={() => setBookingsVisibilityFilter(waiting)}
          />
          <FilterLink
            icon="done_all"
            text="Accepted"
            style={{ color: '#FF8000' }}
            active={visibilityFilter === accepted}
            onClick={() => setBookingsVisibilityFilter(accepted)}
          />
          <FilterLink
            icon="check_circle"
            text="Completed"
            style={{ color: '#3ADF00' }}
            active={visibilityFilter === completed}
            onClick={() => setBookingsVisibilityFilter(completed)}
          />
          <FilterLink
            icon="clear"
            text="Rejected"
            style={{ color: '#FF0040' }}
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
