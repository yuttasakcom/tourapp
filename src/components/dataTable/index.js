import React from 'react'

import Header from './Header'

export default ({ title, description }) =>
  <div className="card">
    <Header title={title} description={description} />
    <div className="card-content table-responsive">
      <table className="table">
        <thead className="text-primary">
          <th>Name</th>
          <th>Country</th>
          <th>City</th>
          <th>Salary</th>
          <th style={{ width: 200 }}>Manage</th>
        </thead>
        <tbody>
          <tr>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td className="text-primary">$36,738</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Minerva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaai-Waas</td>
            <td className="text-primary">$23,789</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td className="text-primary">$56,142</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td className="text-primary">$38,735</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td className="text-primary">$63,542</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td className="text-primary">$78,615</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
