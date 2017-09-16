import React from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import OAuth from './OAuth'
import SignIn from './SignIn'
import SignUp from './SignUp'
import * as actions from '../../../actions'

class Auth extends React.PureComponent {
  state = {
    signIn: true
  }
  onSubmit = values => {
    this.props.signIn('company', values)
  }

  render() {
    return (
      <Card title="สมัครสมาชิก/เข้าสู่ระบบ">
        <div className="row">
          <div
            className="col-md-8"
            style={{ borderRight: '1px dotted #C2C2C2', paddingRight: '30px' }}
          >
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
            <div className="tab-content">
              <SignIn />
              <SignUp />
            </div>
            <div id="OR" className="hidden-xs">
              หรือ
            </div>
          </div>
          <div className="col-md-4">
            <OAuth />
          </div>
        </div>
      </Card>
    )
  }
}

export default connect(null, actions)(Auth)
