import React from 'react'
import { connect } from 'react-redux'

import MenuItem from '../../../components/layout/mainMenu/MenuItem'

class MenuList extends React.PureComponent {
  render() {
    return this.props.authenticated ? (
      <ul className="nav">
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
  authenticated: authenticated && user.role === 'agent'
})

export default connect(mapStateToProps)(MenuList)
