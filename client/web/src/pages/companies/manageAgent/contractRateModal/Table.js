import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../../state/ducks/actions'

class Table extends PureComponent {
  renderAction = (cell, row) => {
    const {
      openOfferSpecialPriceModal,
      openResetPriceModal,
      selectOfferSpecialPricePkg
    } = this.props
    return (
      <div>
        <button
          className="btn btn-info btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectOfferSpecialPricePkg(row._id)
            openOfferSpecialPriceModal()
          }}
        >
          Offer Special Price
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ margin: 0 }}
          onClick={() => {
            selectOfferSpecialPricePkg(row._id)
            openResetPriceModal()
          }}
        >
          Reset
        </button>
      </div>
    )
  }
  render() {
    const { contractRates } = this.props
    return (
      <BootstrapTable
        data={Object.values(contractRates)}
        exportCSV
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn hidden dataField="_id" isKey>
          Contract Rates ID
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataSort
          headerAlign="right"
          dataAlign="right"
          dataField="priceAdult"
        >
          Adult Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataSort
          headerAlign="right"
          dataAlign="right"
          dataField="priceChild"
        >
          Child Price
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

const mapStateToProps = ({ company: { agent } }) => ({
  contractRates: agent.selectedAgentContractRates
})

export default connect(mapStateToProps, actions.company.agent)(Table)
