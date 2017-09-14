import React from 'react'

import Gem from './Gem'

class Notification extends React.PureComponent {
  renderListItem = () => {
    return this.props.notifications.map((notification, index) => (
      <li key={index}>
        <a>{notification}</a>
      </li>
    ))
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

export default Notification
