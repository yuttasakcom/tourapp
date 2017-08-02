import React, { PureComponent } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Table extends PureComponent {
  componentDidMount() {
    this.props.fetchBookingsSummary(this.props.date)
  }

  render() {
    const { bookingsSummary } = this.props
    console.log(bookingsSummary)
    return (
      <BootstrapTable
        data={bookingsSummary}
        exportCSV
        search
        striped
        hover
        condensed
        options={{ clearSearch: true }}
      >
        <TableHeaderColumn dataField="_id" isKey>
          Booking ID
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = ({
  bookingSummary: { bookingsSummary, visibilityFilter: { date } }
}) => ({ bookingsSummary, date })

export default connect(mapStateToProps, actions)(Table)
