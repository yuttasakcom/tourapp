import React, { Component } from 'react'

import Card from '../Card'

class DataTable extends Component {
  renderTableTitle() {
    return (
      <tr>
        {this.props.tableTitles.map(tableTitle =>
          <th key={tableTitle}>{tableTitle}</th>
        )}
        <th style={{ width: 200, textAlign: 'center' }}>Manage</th>
      </tr>
    )
  }

  render() {
    const { title, description } = this.props

    return (
      <Card title={title} description={description}>
        <table className="table">
          <thead className="text-primary">
            {this.renderTableTitle()}
          </thead>
          <tbody>
            {this.props.renderTableBody()}
          </tbody>
        </table>
      </Card>
    )
  }
}

export default DataTable
