import React from 'react'
import { connect } from 'react-redux'

import Card from '../../../components/Card'
import Tab from './Tab'
import OAuth from './OAuth'
import SignIn from './SignIn'
import SignUp from './SignUp'
import * as actions from '../../../actions'

class Auth extends React.PureComponent {
  state = {
    currentTab: 'signIn'
  }
  onSubmit = values => {
    this.props.signIn('company', values)
  }

  render() {
    const { currentTab } = this.state
    return (
      <Card title="สมัครสมาชิก/เข้าสู่ระบบ">
        <div className="row">
          <div
            className="col-md-8"
            style={{ borderRight: '1px dotted #C2C2C2', paddingRight: '30px' }}
          >
            <Tab
              currentTab={currentTab}
              onSignInClick={() => this.setState({ currentTab: 'signIn' })}
              onSignUpClick={() => this.setState({ currentTab: 'signUp' })}
            />
            <div className="tab-content">
              <SignIn active={currentTab === 'signIn'} />
              <SignUp active={currentTab === 'signUp'} />
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

const mapStateToProps = ({ auth: { authenticated, user } }) => ({
  authenticated: authenticated && user.role === 'company'
})

export default connect(mapStateToProps, actions)(Auth)
