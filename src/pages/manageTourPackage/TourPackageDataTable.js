import React, { Component } from 'react'
import { connect } from 'react-redux'

import DataTable from '../../components/dataTable'
import * as actions from '../../actions'

class TourPackageDataTable extends Component {
  componentDidMount() {
    this.props.fetchPackages()
  }

  renderTableBody = () => {
    return this.props.packages.map(row =>
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
    const { packages } = this.props

    if (!packages) {
      return <div />
    }

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
  packages: state.packages
})

export default connect(mapStateToProps, actions)(TourPackageDataTable)
