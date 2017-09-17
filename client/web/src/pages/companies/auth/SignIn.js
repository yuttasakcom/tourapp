import React from 'react'

class SignIn extends React.PureComponent {
  render() {
    const { active } = this.props
    return (
      <div className={`tab-pane${active ? ' active' : ''}`} id="Login">
        <form role="form" className="form-horizontal">
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 control-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email1"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 control-label"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
              <a href="javascript:;">Forgot your password?</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
