import React from 'react'

export default ({ title, description, children }) =>
  <div className="card">
    <div className="card-header" data-background-color="purple">
      <h4 className="title">{title}</h4>
      <p className="category">{description}</p>
    </div>
    <div className="card-content table-responsive">
      {children}
    </div>
  </div>
