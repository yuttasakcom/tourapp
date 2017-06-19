import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import AddModal from './AddModal'
import * as actions from '../../actions'

class PkgDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  renderTableBody = () => {
    const { pkgs, openAddBookingModal } = this.props

    if (!pkgs) {
      return <tr />
    }

    return _.map(pkgs, pkg =>
      <tr key={pkg._id}>
        <td>{pkg.name}</td>
        <td>{pkg.company.email}</td>
        <td>{pkg.priceAdult.toLocaleString()}</td>
        <td>{pkg.priceChild.toLocaleString()}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => openAddBookingModal(pkg._id)}
          >
            Book
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['Name', 'Company', 'Adult Price', 'Child Price']
    return (
      <Card title="Packages" description="Select package for book">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
        <AddModal />
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
