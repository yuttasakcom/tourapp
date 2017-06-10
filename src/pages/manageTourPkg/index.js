import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Layout from '../../components/layout'
import TourPkgDataTable from './TourPkgDataTable'
import AddModal from './AddModal'
import Notification from '../../components/Notification'
import * as actions from '../../actions'

class ManageTourPkg extends PureComponent {
  renderNotification() {
    const { show, type, message } = this.props.notification
    if (show) {
      return <Notification type={type} message={message} />
    }
  }

  render() {
    return (
      <Layout title="Manage Tour Package">
        <div className="container-fluid">
          {this.renderNotification()}
          <button
            className="btn btn-primary pull-right"
            onClick={this.props.openAddPkgModal}
          >
            Add
          </button>
          <div className="row">
            <div className="col-md-12">
              <TourPkgDataTable />
            </div>
          </div>
        </div>
        <AddModal />
      </Layout>
    )
  }
}

const mapStateToProps = ({ pkg: { notification } }) => ({
  notification
})

export default connect(mapStateToProps, actions)(ManageTourPkg)
