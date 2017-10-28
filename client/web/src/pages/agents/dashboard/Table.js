import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../state/ducks/actions'

class Table extends React.PureComponent {
  componentDidMount() {
    this.props.fetchDashboard()
  }

  render() {
    const { bookingsSummary } = this.props
    return (
      <BootstrapTable
        data={bookingsSummary}
        exportCSV
        height={400}
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn dataSort dataField="_id" isKey>
          Package Name
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalBooking"
        >
          Booking Total
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalAdult"
        >
          Adult
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalChild"
        >
          Child
        </TableHeaderColumn>
        <TableHeaderColumn
          headerAlign="right"
          dataAlign="right"
          dataSort
          dataField="totalSeat"
        >
          Total Seat
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = ({ agent: { dashboard: { bookingsSummary } } }) => ({
  bookingsSummary
})

export default connect(mapStateToProps, actions.agent.dashboard)(Table)
