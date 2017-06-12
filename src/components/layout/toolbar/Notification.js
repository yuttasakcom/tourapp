import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../actions'

class Notification extends PureComponent {
  componentDidMount() {
    this.props.fetchNotifications()
  }

  render() {
    const {
      showNotificationGem,
      toggleNotificationGem,
      notifications
    } = this.props
    return (
      <Gem
        icon="notifications"
        items={notifications}
        show={showNotificationGem}
        toggle={toggleNotificationGem}
      />
    )
  }
}

const mapStateToProps = ({
  notification: { showNotificationGem, notifications }
}) => {
  return { showNotificationGem, notifications }
}

export default connect(mapStateToProps, actions)(Notification)
