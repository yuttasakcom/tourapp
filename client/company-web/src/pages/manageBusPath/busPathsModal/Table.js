import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../../actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBusPaths()
  }

  openEditBusPathModal = busPathId => {
    this.props.openEditBusPathModal(busPathId)
    this.props.fetchBusPathHotels(busPathId)
  }

  renderAction = (cell, row) => {
    const { openDeleteBusPathModal } = this.props
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
          onClick={() => openDeleteBusPathModal(row._id)}
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
        height={400}
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

const mapStateToProps = ({ busPath: { busPaths } }) => ({ busPaths })

export default connect(mapStateToProps, actions)(Table)
