import React from 'react'

import Card from '../../../components/Card'
import CompanyDataTable from './CompanyDataTable'
import RequestModal from './RequestModal'

class ManageCompany extends React.PureComponent {
  state = {
    showRequestCompanyModal: false
  }

  render() {
    return (
      <div className="container-fluid">
        <Card title="Companies" description="Manage companies">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={() => this.setState({ showRequestCompanyModal: true })}
              >
                Request Company
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <CompanyDataTable />
            </div>
          </div>
        </Card>
        <RequestModal
          showModal={this.state.showRequestCompanyModal}
          closeModal={() => this.setState({ showRequestCompanyModal: false })}
        />
      </div>
    )
  }
}

export default ManageCompany
