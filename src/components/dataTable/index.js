import React, { Component } from 'react'

import Header from './Header'

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
      <div className="card">
        <Header title={title} description={description} />
        <div className="card-content table-responsive">
          <table className="table">
            <thead className="text-primary">
              {this.renderTableTitle()}
            </thead>
            <tbody>
              {this.props.renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default DataTable
