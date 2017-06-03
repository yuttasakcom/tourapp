import React from 'react'

export default () => (
  <nav className="navbar navbar-transparent navbar-absolute">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#navigation-example"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="http://www.creative-tim.com">
          Creative Tim
        </a>
      </div>

      <div className="collapse navbar-collapse" id="navigation-example">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="../components-documentation.html" target="_blank">
              Components
            </a>
          </li>
          <li>
            <a
              href="http://demos.creative-tim.com/material-kit-pro/presentation.html?ref=utp-freebie"
              target="_blank"
            >
              <i className="material-icons">unarchive</i> Upgrade to PRO
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/CreativeTim"
              target="_blank"
              className="btn btn-simple btn-white btn-just-icon"
            >
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/CreativeTim"
              target="_blank"
              className="btn btn-simple btn-white btn-just-icon"
            >
              <i className="fa fa-facebook-square" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/CreativeTimOfficial"
              target="_blank"
              className="btn btn-simple btn-white btn-just-icon"
            >
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)
