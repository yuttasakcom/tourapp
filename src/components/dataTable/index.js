import React, { PureComponent } from 'react'

class DataTable extends PureComponent {
  renderTableTitle() {
    return (
      <tr>
        {this.props.tableTitles.map(tableTitle =>
          <th key={tableTitle}>{tableTitle}</th>
        )}
        <th style={{ textAlign: 'center' }}>Manage</th>
      </tr>
    )
  }

  render() {
    return (
      <table className="table">
        <thead className="text-primary">
          {this.renderTableTitle()}
        </thead>
        <tbody>
          {this.props.renderTableBody()}
        </tbody>
      </table>
    )
  }
}

export default DataTable
