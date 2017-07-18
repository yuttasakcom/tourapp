import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CompanyDataTable from './CompanyDataTable'
import RequestModal from './RequestModal'
import Notification from '../../components/Notification'
import * as actions from '../../actions'

class ManageCompany extends PureComponent {
  renderNotification() {
    const { show, type, message } = this.props.notification
    if (show) {
      return <Notification type={type} message={message} />
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderNotification()}
        <button
          className="btn btn-primary pull-right"
          onClick={this.props.openRequestCompanyModal}
        >
          Request Company
        </button>
        <div className="row">
          <div className="col-md-12">
            <CompanyDataTable />
          </div>
        </div>
        <RequestModal />
      </div>
    )
  }
}

const mapStateToProps = ({ company: { notification } }) => ({
  notification
})

export default connect(mapStateToProps, actions)(ManageCompany)
