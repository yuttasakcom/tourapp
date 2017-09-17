import React from 'react'

class Tab extends React.PureComponent {
  render() {
    const { onSignInClick, onSignUpClick, currentTab } = this.props
    return (
      <ul className="nav nav-tabs">
        <li
          className={`${currentTab === 'signIn' ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          <a onClick={onSignInClick}>เข้าสู่ระบบ</a>
        </li>
        <li
          className={`${currentTab === 'signUp' ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          <a onClick={onSignUpClick}>สมัครสมาชิก</a>
        </li>
      </ul>
    )
  }
}

export default Tab
