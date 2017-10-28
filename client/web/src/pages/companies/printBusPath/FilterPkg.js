import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import Select from 'react-select'

import actions from '../../../state/ducks/actions'

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
        onChange={value =>
          fetchBookingsHotelsSummaryAndBusPaths({ date, pkg: value })}
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

export default connect(mapStateToProps, {
  ...actions.company.pkg,
  ...actions.company.printBusPath
})(FilterPkg)
