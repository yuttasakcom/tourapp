import React, { PureComponent } from 'react'

import MenuItem from './MenuItem'

class MenuList extends PureComponent {
  render() {
    return (
      <ul className="nav">
        <MenuItem icon="dashboard" path="/dashboard" />
        <MenuItem icon="book" path="/booking" />
        <MenuItem icon="assignment" path="/manage-booking" />
        <MenuItem icon="group" path="/manage-employee" />
        <MenuItem icon="contact_phone" path="/manage-company" />
      </ul>
    )
  }
}

export default MenuList
