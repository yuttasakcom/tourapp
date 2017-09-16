import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import MenuItem from '../../../components/layout/mainMenu/MenuItem'

class MenuList extends PureComponent {
  render() {
    const { authenticated, user } = this.props
    return authenticated && user.role === 'company' ? (
      <ul className="nav">
        <MenuItem
          icon="dashboard"
          path="/companies/dashboard"
          text="แดชบอร์ด"
        />
        <MenuItem
          icon="assignment"
          path="/companies/manage-booking"
          text="รายการจอง"
        />
        <MenuItem
          icon="chrome_reader_mode"
          path="/companies/booking-summary"
          text="สรุปยอดจอง"
        />
        <MenuItem
          icon="directions_bus"
          path="/companies/print-bus-path"
          text="พิมพ์สายรถ"
        />
        <MenuItem
          icon="edit_location"
          path="/companies/manage-bus-path"
          text="จัดการสายรถ"
        />
        <MenuItem
          icon="widgets"
          path="/companies/manage-tour-package"
          text="จัดการแพคเก็จ"
        />
        <MenuItem
          icon="contact_phone"
          path="/companies/manage-agent"
          text="จัดการตัวแทนจำหน่าย"
        />
      </ul>
    ) : (
      <ul className="nav">
        <MenuItem
          icon="account_circle"
          path="/companies/signin"
          text="สมัครสมาชิก/เข้าสู่ระบบ"
        />
      </ul>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated, user } }) => ({
  user,
  authenticated
})

export default connect(mapStateToProps)(MenuList)
