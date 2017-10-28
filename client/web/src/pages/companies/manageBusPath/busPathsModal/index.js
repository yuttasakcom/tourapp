import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

import BusPathDataTable from './BusPathDataTable'
import AddModal from './AddModal'
import actions from '../../../../state/ducks/actions'

class ManageBusPath extends React.PureComponent {
  state = {
    showAddBusPathModal: false
  }

  openAddBusPathModal = () => {
    this.setState({ showAddBusPathModal: true })
    this.props.fetchBusPathHotels()
  }

  render() {
    const { showModal, closeModal, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Bus paths for package {pkg.name}</Modal.Title>
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
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
        <AddModal
          showModal={this.state.showAddBusPathModal}
          closeModal={() => this.setState({ showAddBusPathModal: false })}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({
  company: { busPath: { selectedPkg }, pkg: { pkgs } }
}) => ({
  pkg: pkgs[selectedPkg]
})

export default connect(mapStateToProps, actions.company.busPath)(ManageBusPath)
