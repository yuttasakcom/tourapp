import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import * as actions from '../../actions'

class PkgDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  renderTableBody = () => {
    const { pkgs } = this.props

    if (!pkgs) {
      return <tr />
    }

    return _.map(pkgs, pkg =>
      <tr key={pkg._id}>
        <td>{pkg.name}</td>
        <td>{pkg.priceAdult.toLocaleString()}</td>
        <td>{pkg.priceChild.toLocaleString()}</td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['Name', 'Adult Price', 'Child Price']
    return (
      <Card title="Packages" description="Select package for book">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    pkgs: state.booking.pkgs
  }
}

export default connect(mapStateToProps, actions)(PkgDataTable)
