import React, { Component } from 'react'
import { connect } from 'react-redux'

import DataTable from '../../components/dataTable'
import * as actions from '../../actions'

class TourPkgDataTable extends Component {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  renderTableBody = () => {
    const { pkgs } = this.props

    if (!pkgs) {
      return <tr />
    }

    return pkgs.map(row =>
      <tr key={row._id}>
        <td>{row.name}</td>
        <td>{row.description}</td>
        <td>{row.priceAdult}</td>
        <td>{row.priceChild}</td>
        <td style={{ textAlign: 'center' }}>
          <button className="btn btn-warning btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['Name', 'Description', 'Adult Price', 'Child Price']
    return (
      <DataTable
        title="Packages"
        description="Manage tour packages"
        tableTitles={tableTitles}
        renderTableBody={this.renderTableBody}
      />
    )
  }
}

const mapStateToProps = state => ({
  pkgs: state.pkgs
})

export default connect(mapStateToProps, actions)(TourPkgDataTable)
