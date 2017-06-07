import React from 'react'

import Layout from '../../components/layout'
import DataTable from '../../components/dataTable'

export default () =>
  <Layout title="Manage Tour Package">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <DataTable />
        </div>
      </div>
    </div>
  </Layout>
