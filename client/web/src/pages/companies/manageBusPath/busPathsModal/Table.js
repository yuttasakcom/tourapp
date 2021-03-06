import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../../state/ducks/actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBusPaths(this.props.selectedPkg)
  }

  openEditBusPathModal = busPathId => {
    this.props.selectBusPath(busPathId)
    this.props.fetchBusPathHotels(busPathId)
    this.props.openEditBusPathModal()
  }

  openDeleteBusPathModal = busPathId => {
    this.props.selectBusPath(busPathId)
    this.props.openDeleteBusPathModal()
  }

  renderAction = (cell, row) => {
    return (
      <div>
        <button
          className="btn btn-warning btn-sm"
          style={{ margin: 0 }}
          onClick={() => this.openEditBusPathModal(row._id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ margin: 0 }}
          onClick={() => this.openDeleteBusPathModal(row._id)}
        >
          Delete
        </button>
      </div>
    )
  }

  renderHotels = (cell, row) => {
    return row.hotels.length
  }

  render() {
    const { busPaths } = this.props
    return (
      <BootstrapTable
        data={Object.values(busPaths)}
        exportCSV
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Bus Path ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="description">
          Description
        </TableHeaderColumn>
        <TableHeaderColumn
          dataSort
          dataField="hotels"
          dataFormat={this.renderHotels}
        >
          Total Hotels
        </TableHeaderColumn>
        <TableHeaderColumn
          width="180"
          dataFormat={this.renderAction}
          headerAlign="center"
          dataAlign="center"
          export={false}
        >
          Action
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = ({
  company: { busPath: { busPaths, selectedPkg } }
}) => ({
  busPaths,
  selectedPkg
})

export default connect(mapStateToProps, actions.company.busPath)(Table)
