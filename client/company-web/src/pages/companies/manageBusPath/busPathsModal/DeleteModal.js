import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import * as actions from '../../../../actions/companies'

class DeleteModal extends PureComponent {
  render() {
    const {
      showModal,
      closeDeleteBusPathModal,
      deleteBusPath,
      busPath
    } = this.props

    if (!busPath) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeDeleteBusPathModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Bus Path</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete bus path {busPath.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDeleteBusPathModal}>No</Button>
          <Button bsStyle="danger" onClick={() => deleteBusPath(busPath)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { busPath } }) => ({
  showModal: busPath.showDeleteBusPathModal,
  busPath: busPath.busPaths[busPath.selectedBusPath]
})

export default connect(mapStateToProps, actions)(DeleteModal)
