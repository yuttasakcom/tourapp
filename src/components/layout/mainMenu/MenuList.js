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
  </ul>
