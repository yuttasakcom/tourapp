import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import EmployeeDataTable from './EmployeeDataTable'
import AddModal from './AddModal'
import Notification from '../../components/Notification'
import * as actions from '../../actions'

class ManageEmployee extends PureComponent {
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
          onClick={this.props.openAddEmployeeModal}
        >
          Add
        </button>
        <div className="row">
          <div className="col-md-12">
            <EmployeeDataTable />
          </div>
        </div>
        <AddModal />
      </div>
    )
  }
}

const mapStateToProps = ({ employee: { notification } }) => ({
  notification
})

export default connect(mapStateToProps, actions)(ManageEmployee)
