import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import * as actions from '../../actions'

class TourPkgDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  renderTableBody = () => {
    const { pkgs, openDeletePkgModal, openEditPkgModal } = this.props

    if (!pkgs) {
      return <tr />
    }

    return _.map(pkgs, pkg =>
      <tr key={pkg._id}>
        <td>{pkg.name}</td>
        <td>{pkg.description}</td>
        <td>{pkg.priceAdult.toLocaleString()}</td>
        <td>{pkg.priceChild.toLocaleString()}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => openEditPkgModal(pkg._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => openDeletePkgModal(pkg._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['Name', 'Description', 'Adult Price', 'Child Price']
    return (
      <Card title="Packages" description="Manage tour packages">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
        <EditModal />
        <DeleteModal />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  pkgs: state.pkg.pkgs
})

export default connect(mapStateToProps, actions)(TourPkgDataTable)
