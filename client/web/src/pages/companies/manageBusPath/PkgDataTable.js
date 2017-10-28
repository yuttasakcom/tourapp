import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../state/ducks/actions'

class PkgDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchPkgs()
  }

  renderAction = (cell, row) => {
    const { openBusPathsModal, selectPkg } = this.props
    return (
      <button
        className="btn btn-info btn-sm"
        style={{ margin: 0 }}
        onClick={() => {
          openBusPathsModal()
          selectPkg(row._id)
        }}
      >
        Manage Bus Path
      </button>
    )
  }

  render() {
    const { pkgs } = this.props
    return (
      <BootstrapTable
        data={Object.values(pkgs)}
        height={400}
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Pkg ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="description">
          Description
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

const mapStateToProps = ({ company: { pkg: { pkgs } } }) => ({ pkgs })

export default connect(mapStateToProps, {
  ...actions.company.pkg,
  ...actions.company.busPath
})(PkgDataTable)
