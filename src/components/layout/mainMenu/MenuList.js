import React, { PureComponent } from 'react'

import MenuItem from './MenuItem'

class MenuList extends PureComponent {
  render() {
    return (
      <ul className="nav">
        <MenuItem text="Dashboard" icon="dashboard" path="/dashboard" />
        <MenuItem
          text="Notifications"
          icon="notifications"
          path="/notifications"
        />
        <MenuItem
          text="Booking Summary"
          icon="assignment"
          path="/booking-summary"
        />
        <MenuItem
          text="Manage Tour Package"
          icon="widgets"
          path="/manage-tour-package"
        />
        <MenuItem
          text="Manage Agent"
          icon="contact_phone"
          path="/manage-agent"
        />
        <MenuItem
          text="Contract Rate"
          icon="attach_money"
          path="/contract-rate"
        />
      </ul>
    )
  }
}

export default MenuList
