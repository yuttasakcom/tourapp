import React from 'react'
import { connect } from 'react-redux'

import MenuItem from '../../../components/layout/mainMenu/MenuItem'

class MenuList extends React.PureComponent {
  render() {
    const { authenticated, user } = this.props
    return authenticated && user.role === 'agent' ? (
      <ul className="nav">
        <MenuItem
          icon="account_circle"
          path="/agents/signin"
          text="สมัครสมาชิก/เข้าสู่ระบบ"
        />
        <MenuItem icon="dashboard" path="/agents/dashboard" text="แดชบอร์ด" />
        <MenuItem icon="book" path="/agents/booking" text="จอง" />
        <MenuItem
          icon="assignment"
          path="/agents/manage-booking"
          text="จัดการการจอง"
        />
        <MenuItem
          icon="group"
          path="/agents/manage-employee"
          text="จัดการพนักงาน"
        />
        <MenuItem
          icon="contact_phone"
          path="/agents/manage-company"
          text="จัดการบริษัท"
        />
      </ul>
    ) : (
      <ul className="nav">
        <MenuItem
          icon="account_circle"
          path="/agents/signin"
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
