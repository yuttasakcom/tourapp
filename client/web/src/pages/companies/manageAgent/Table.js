import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../state/ducks/actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchAgents()
  }

  renderAction = (cell, row) => {
    const {
      openDeleteAgentModal,
      openContractRateModal,
      selectAgent,
      fetchAgentContractRates
    } = this.props
    return (
      <div>
        <button
          className="btn btn-info btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectAgent(row._id)
            fetchAgentContractRates()
            openContractRateModal()
          }}
        >
          Contract Rate
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectAgent(row._id)
            openDeleteAgentModal()
          }}
        >
          Delete
        </button>
      </div>
    )
  }

  render() {
    const { agents } = this.props
    return (
      <BootstrapTable
        data={Object.values(agents)}
        exportCSV
        height={400}
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Agent ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="email">
          Email
        </TableHeaderColumn>
        <TableHeaderColumn
          width="250"
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

const mapStateToProps = ({ company: { agent: { agents } } }) => ({ agents })

export default connect(mapStateToProps, actions.company.agent)(Table)
