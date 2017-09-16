import React from 'react'

class Tab extends React.PureComponent {
  render() {
    return (
      <ul className="nav nav-tabs">
        <li className="active">
          <a href="#Login" data-toggle="tab">
            เข้าสู่ระบบ
          </a>
        </li>
        <li>
          <a href="#Registration" data-toggle="tab">
            สมัครสมาชิก
          </a>
        </li>
      </ul>
    )
  }
}

export default Tab
