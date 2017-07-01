import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../../actions'

class Notification extends PureComponent {
  componentDidMount() {
    this.props.fetchNotifications()
  }

  renderListItem = () => {
    return this.props.notifications.map((notification, index) =>
      <li key={index}>
        <a>
          {notification}
        </a>
      </li>
    )
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
        length={notifications.length}
        renderListItem={this.renderListItem}
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
