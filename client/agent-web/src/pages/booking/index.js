import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'
import PkgDataTable from './PkgDataTable'
import Notification from '../../components/Notification'
import * as actions from '../../actions'

class Booking extends PureComponent {
  renderNotification() {
    const { show, type, message } = this.props.notification
    if (show) {
      return <Notification type={type} message={message} />
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          {this.renderNotification()}
          <Card title="Packages" description="Select package for book">
            <div className="row">
              <div className="col-md-12">
                <PkgDataTable />
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ booking: { notification } }) => ({
  notification
})

export default connect(mapStateToProps, actions)(Booking)
