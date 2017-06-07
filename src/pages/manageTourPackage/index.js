import React from 'react'

import Layout from '../../components/layout'
import DataTable from '../../components/dataTable'

export default () =>
  <Layout title="Manage Tour Package">
    <div className="container-fluid">
      <button className="btn btn-primary pull-right">Add</button>
      <div className="row">
        <div className="col-md-12">
          <DataTable title="Packages" description="Manage tour packages" />
        </div>
      </div>
    </div>
  </Layout>
