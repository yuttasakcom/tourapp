import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../../components/layout'
import TourPkgDataTable from './TourPkgDataTable'
import AddModal from './AddModal'
import * as actions from '../../actions'

class ManageTourPkg extends Component {
  render() {
    return (
      <Layout title="Manage Tour Package">
        <div className="container-fluid">
          <button
            className="btn btn-primary pull-right"
            onClick={this.props.openAddPkgModal}
          >
            Add
          </button>
          <div className="row">
            <div className="col-md-12">
              <TourPkgDataTable />
            </div>
          </div>
        </div>
        <AddModal />
      </Layout>
    )
  }
}

export default connect(null, actions)(ManageTourPkg)
