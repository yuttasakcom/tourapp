import React from 'react'

class SignUp extends React.PureComponent {
  render() {
    const { active, onCancelClick } = this.props
    return (
      <div className={`tab-pane${active ? ' active' : ''}`} id="Registration">
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
            <label htmlFor="password" className="col-sm-2 control-label">
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
              <button
                onClick={onCancelClick}
                type="button"
                className="btn btn-default btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp
