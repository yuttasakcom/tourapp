import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

import BusPathDataTable from './BusPathDataTable'
import AddModal from './AddModal'
import * as actions from '../../../actions'

class ManageBusPath extends PureComponent {
  openAddBusPathModal = () => {
    const { openAddBusPathModal, fetchBusPathHotels } = this.props
    openAddBusPathModal()
    fetchBusPathHotels()
  }

  render() {
    const { showModal, closeBusPathsModal, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeBusPathsModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Bus paths for package {pkg.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary pull-right"
                onClick={this.openAddBusPathModal}
              >
                Add
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BusPathDataTable />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeBusPathsModal}>Close</Button>
        </Modal.Footer>
        <AddModal />
      </Modal>
    )
  }
}

const mapStateToProps = ({
  busPath: { showBusPathsModal, selectedPkg },
  pkg: { pkgs }
}) => ({
  showModal: showBusPathsModal,
  pkg: pkgs[selectedPkg]
})

export default connect(mapStateToProps, actions)(ManageBusPath)
