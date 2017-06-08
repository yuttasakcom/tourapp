import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../../components/layout'
import TourPackageDataTable from './TourPackageDataTable'
import AddModal from './AddModal'
import * as actions from '../../actions'

class ManageTourPackage extends Component {
  state = {
    showModal: false
  }
  
  closeModal = () => {
    this.setState({ showModal: false })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    return (
      <Layout title="Manage Tour Package">
        <div className="container-fluid">
          <button
            className="btn btn-primary pull-right"
            onClick={this.openModal}
          >
            Add
          </button>
          <div className="row">
            <div className="col-md-12">
              <TourPackageDataTable />
            </div>
          </div>
        </div>
        <AddModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
      </Layout>
    )
  }
}

export default connect(null, actions)(ManageTourPackage)
