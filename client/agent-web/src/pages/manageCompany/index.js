import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import CompanyDataTable from './CompanyDataTable'
import RequestModal from './RequestModal'
import * as actions from '../../actions'

class ManageCompany extends PureComponent {
  render() {
    return (
      <div className="container-fluid">
        <Card title="Companies" description="Manage companies">
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={this.props.openRequestCompanyModal}
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
        <RequestModal />
      </div>
    )
  }
}

export default connect(null, actions)(ManageCompany)
