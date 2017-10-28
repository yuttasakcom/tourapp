import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import actions from '../../../../state/ducks/actions'

class DeleteModal extends PureComponent {
  render() {
    const { showModal, closeModal, deleteBusPath, busPath } = this.props

    if (!busPath) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Bus Path</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete bus path {busPath.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>No</Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              deleteBusPath(busPath._id)
              closeModal()
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { busPath } }) => ({
  busPath: busPath.busPaths[busPath.selectedBusPath]
})

export default connect(mapStateToProps, actions.company.busPath)(DeleteModal)
