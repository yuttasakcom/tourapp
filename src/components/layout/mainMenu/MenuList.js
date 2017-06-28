import React, { PureComponent } from 'react'

import MenuItem from './MenuItem'

class MenuList extends PureComponent {
  render() {
    return (
      <ul className="nav">
        <MenuItem icon="dashboard" path="/dashboard" />
        <MenuItem icon="book" path="/booking" />
        <MenuItem icon="notifications" path="/notifications" />
        <MenuItem icon="assignment" path="/manage-booking" />
        <MenuItem icon="contact_phone" path="/manage-company" />
        <MenuItem icon="attach_money" path="/contract-rate" />
      </ul>
    )
  }
}

export default MenuList
