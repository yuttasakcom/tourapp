import React from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import OAuth from './OAuth'
import SignIn from './SignIn'
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
              <div className="tab-pane" id="Registration">
                <form role="form" className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-2 control-label">
                      Name
                    </label>
                    <div className="col-sm-10">
                      <div className="row">
                        <div className="col-md-3">
                          <select className="form-control">
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                          </select>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-2 control-label">
                      Email
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile" className="col-sm-2 control-label">
                      Mobile
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="col-sm-2 control-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-10">
                      <button type="button" className="btn btn-primary btn-sm">
                        Save & Continue
                      </button>
                      <button type="button" className="btn btn-default btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
