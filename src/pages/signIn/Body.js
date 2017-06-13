import React, { PureComponent } from 'react'

class Body extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <div className="card card-signup">
              <form className="form" method="" action="">
                <div className="header header-primary text-center">
                  <h4>Sign Up</h4>
                </div>
                <div className="content">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="material-icons">email</i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email..."
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="material-icons">lock_outline</i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password..."
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="footer text-center">
                  <a
                    href="#pablo"
                    onClick={this.props.onSignIn}
                    className="btn btn-simple btn-primary btn-lg"
                  >
                    Get Started
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Body
