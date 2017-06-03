import React from 'react'

export default () => (
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div className="card card-signup">
          <form className="form" method="" action="">
            <div className="header header-primary text-center">
              <h4>Sign Up</h4>
              <div className="social-line">
                <a href="#pablo" className="btn btn-simple btn-just-icon">
                  <i className="fa fa-facebook-square" />
                </a>
                <a href="#pablo" className="btn btn-simple btn-just-icon">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#pablo" className="btn btn-simple btn-just-icon">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
            <p className="text-divider">Or Be Classical</p>
            <div className="content">

              <div className="input-group">
                <span className="input-group-addon">
                  <i className="material-icons">face</i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name..."
                />
              </div>

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

              <div className="checkbox">
                <label>
                  <input type="checkbox" name="optionsCheckboxes" checked />
                  Subscribe to newsletter
                </label>
              </div>
            </div>
            <div className="footer text-center">
              <a href="#pablo" className="btn btn-simple btn-primary btn-lg">
                Get Started
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)
