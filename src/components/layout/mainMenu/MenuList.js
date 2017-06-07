import React from 'react'

import MenuItem from './MenuItem'

export default ({ title }) =>
  <ul className="nav">
    <MenuItem
      text="Dashboard"
      icon="dashboard"
      title={title}
      path="/dashboard"
    />
    <MenuItem
      text="Notifications"
      icon="notifications"
      title={title}
      path="/notifications"
    />
    <MenuItem
      text="Booking Summary"
      icon="assignment"
      title={title}
      path="/booking-summary"
    />
    <MenuItem
      text="Manage Tour Package"
      icon="assignment"
      title={title}
      path="/manage-tour-package"
    />
    <MenuItem
      text="Manage Agent"
      icon="assignment"
      title={title}
      path="/manage-agent"
    />
    <MenuItem
      text="Contract Rate"
      icon="assignment"
      title={title}
      path="/contract-rate"
    />
  </ul>
