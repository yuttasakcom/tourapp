import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import actions from '../../../state/ducks/actions'

class DeleteModal extends PureComponent {
  render() {
    const { showModal, closeModal, deletePkg, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Tour Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete package {pkg.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>No</Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              deletePkg(pkg._id)
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

const mapStateToProps = ({ company: { pkg } }) => ({
  pkg: pkg.pkgs[pkg.selectedPkg]
})

export default connect(mapStateToProps, actions.company.pkg)(DeleteModal)
