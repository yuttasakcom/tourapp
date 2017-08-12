import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'

class Notification extends PureComponent {
  render() {
    return <Notifications notifications={this.props.notifications} />
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications })

export default connect(mapStateToProps)(Notification)
