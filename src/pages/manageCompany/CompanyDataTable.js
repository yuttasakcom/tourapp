import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import DataTable from '../../components/dataTable'
import DeleteModal from './DeleteModal'
import * as actions from '../../actions'

class CompanyDataTable extends PureComponent {
  componentDidMount() {
    this.props.fetchCompanies()
  }

  renderTableBody = () => {
    const { companies, openDeleteCompanyModal } = this.props

    if (!companies) {
      return null
    }

    return _.map(companies, company =>
      <tr key={company._id}>
        <td>{company._id}</td>
        <td>{company.email}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => openDeleteCompanyModal(company._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const tableTitles = ['_id', 'Email']
    return (
      <Card title="Companies" description="Manage companies">
        <DataTable
          tableTitles={tableTitles}
          renderTableBody={this.renderTableBody}
        />
        <DeleteModal />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  companies: state.company.companies
})

export default connect(mapStateToProps, actions)(CompanyDataTable)
