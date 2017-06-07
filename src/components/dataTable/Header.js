import React from 'react'

export default ({ title, description }) =>
  <div className="card-header" data-background-color="purple">
    <h4 className="title">{title}</h4>
    <p className="category">{description}</p>
  </div>
