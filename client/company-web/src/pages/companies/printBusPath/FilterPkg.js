import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import Select from 'react-select'

import * as actions from '../../../actions/companies'

class FilterPkg extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  render() {
    const {
      pkgs,
      date,
      pkg,
      fetchBookingsHotelsSummaryAndBusPaths
    } = this.props
    return (
      <Select
        options={pkgs}
        onChange={value => fetchBookingsHotelsSummaryAndBusPaths(date, value)}
        value={pkg}
      />
    )
  }
}

const mapStateToProps = ({
  company: { pkg: { pkgs }, printBusPath: { visibilityFilter: { date, pkg } } }
}) => ({
  pkgs: map(pkgs, pkg => ({
    value: pkg._id,
    label: pkg.name
  })),
  date,
  pkg
})

export default connect(mapStateToProps, actions)(FilterPkg)
