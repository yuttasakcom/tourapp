import React from 'react'

import Card from '../Card'
import Tab from './Tab'
import OAuth from './OAuth'
import SignIn from './SignIn'
import SignUp from './SignUp'

class Auth extends React.PureComponent {
  state = {
    currentTab: 'signIn'
  }

  render() {
    const { currentTab } = this.state
    const { onSignIn, onSignUp } = this.props
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
              <SignIn onSubmit={onSignIn} active={currentTab === 'signIn'} />
              <SignUp
                onCancelClick={() => this.setState({ currentTab: 'signIn' })}
                onSubmit={onSignUp}
                active={currentTab === 'signUp'}
              />
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

export default Auth
