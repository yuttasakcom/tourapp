import React from 'react'

class OAuth extends React.PureComponent {
  render() {
    return (
      <div className="row text-center sign-with">
        <div className="col-md-12">
          <h3>เข้าสู่ระบบด้วย</h3>
        </div>
        <div className="col-md-12">
          <div className="btn-group btn-group-justified">
            <a
              href="/api/auth/facebook"
              className="btn btn-block btn-social btn-facebook"
            >
              <span className="fa fa-facebook" /> Sign in with Facebook
            </a>
            <a
              href="/api/auth/google"
              className="btn btn-block btn-social btn-google"
            >
              <span className="fa fa-google" /> Sign in with Google
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default OAuth
