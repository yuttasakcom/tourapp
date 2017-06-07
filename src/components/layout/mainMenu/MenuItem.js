import React from 'react'
import { Link } from 'react-router-dom'

export default ({ text, icon, title, path }) =>
  <li className={text === title ? 'active' : ''}>
    <Link to={path}>
      <i className="material-icons">{icon}</i>
      <p>{text}</p>
    </Link>
  </li>
