import React from 'react'

export default () => (
  <footer className="footer">
    <div className="container">
      <nav className="pull-left">
        <ul>
          <li>
            <a href="http://www.creative-tim.com">
              Creative Tim
            </a>
          </li>
          <li>
            <a href="http://presentation.creative-tim.com">
              About Us
            </a>
          </li>
          <li>
            <a href="http://blog.creative-tim.com">
              Blog
            </a>
          </li>
          <li>
            <a href="http://www.creative-tim.com/license">
              Licenses
            </a>
          </li>
        </ul>
      </nav>
      <div className="copyright pull-right">
        © 2016, made with
        {' '}
        <i className="fa fa-heart heart" />
        {' '}
        by
        {' '}
        <a href="http://www.creative-tim.com" target="_blank">Creative Tim</a>
      </div>
    </div>
  </footer>
)
