import React, { PureComponent } from 'react'
import FilterLink from './FilterLink'

class FilterLinks extends PureComponent {
  render() {
    return (
      <div className="pull-right">
        <ul className="nav nav-pills nav-pills-primary" role="tablist">
          <FilterLink icon="alarm" text="Waiting" active />
          <FilterLink icon="done" text="Readed" />
          <FilterLink icon="done_all" text="Accepted" />
          <FilterLink icon="check_circle" text="Completed" />
          <FilterLink icon="clear" text="Rejected" />
        </ul>
      </div>
    )
  }
}

export default FilterLinks
