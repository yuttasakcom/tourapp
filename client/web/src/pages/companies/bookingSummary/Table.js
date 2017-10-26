import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import actions from '../../../state/ducks/actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBookingSummary(this.props.date)
  }

  render() {
    const { bookingSummary } = this.props
    return (
      <BootstrapTable
        data={bookingSummary}
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

const mapStateToProps = ({
  company: { bookingSummary: { bookingSummary, visibilityFilter: { date } } }
}) => ({ bookingSummary, date })

export default connect(mapStateToProps, actions.company.bookingSummary)(Table)
