import React, { PureComponent } from 'react'

import MenuItem from './MenuItem'

class MenuList extends PureComponent {
  render() {
    return (
      <ul className="nav">
        <MenuItem icon="dashboard" path="/dashboard" />
        <MenuItem icon="notifications" path="/notifications" />
        <MenuItem icon="assignment" path="/manage-booking" />
        <MenuItem icon="assignment" path="/booking-summary" />
        <MenuItem icon="widgets" path="/manage-tour-package" />
        <MenuItem icon="contact_phone" path="/manage-agent" />
        <MenuItem icon="attach_money" path="/contract-rate" />
      </ul>
    )
  }
}

export default MenuList
