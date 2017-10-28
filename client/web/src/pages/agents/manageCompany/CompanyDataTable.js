import React, { PureComponent } from 'react'

import Table from './Table'
import DeleteModal from './DeleteModal'

class CompanyDataTable extends PureComponent {
  state = {
    showDeleteCompanyModal: false
  }

  render() {
    return (
      <div>
        <Table
          openDeleteCompanyModal={() =>
            this.setState({ showDeleteCompanyModal: true })}
        />
        <DeleteModal
          showModal={this.state.showDeleteCompanyModal}
          closeModal={() => this.setState({ showDeleteCompanyModal: false })}
        />
      </div>
    )
  }
}

export default CompanyDataTable
