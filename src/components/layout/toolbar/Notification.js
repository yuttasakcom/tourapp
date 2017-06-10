import React from 'react'

export default () =>
  <li className="dropdown">
    <a className="dropdown-toggle" data-toggle="dropdown">
      <i className="material-icons">notifications</i>
      <span className="notification">5</span>
      <p className="hidden-lg hidden-md">Notifications</p>
    </a>
    <ul className="dropdown-menu">
      <li><a>Mike John responded to your email</a></li>
      <li><a>You have 5 new tasks</a></li>
      <li><a>You're now friend with Andrew</a></li>
      <li><a>Another Notification</a></li>
      <li><a>Another One</a></li>
    </ul>
  </li>
