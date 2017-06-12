import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../actions'

class Notification extends PureComponent {
  render() {
    const { show, toggleNotificationGem } = this.props

    const items = [
      'Mike John responded to your email',
      'You have 5 new tasks',
      'Youre now friend with Andrew',
      'Another Notification',
      'Another One'
    ]
    return (
      <Gem
        icon="notifications"
        items={items}
        show={show}
        toggle={toggleNotificationGem}
      />
    )
  }
}

const mapStateToProps = ({ notification }) => {
  return { show: notification.showNotificationGem }
}

export default connect(mapStateToProps, actions)(Notification)
