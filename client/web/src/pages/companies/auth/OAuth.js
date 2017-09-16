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
            <a href="#" className="btn btn-primary">
              Facebook
            </a>{' '}
            <a href="#" className="btn btn-danger">
              Google
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default OAuth
