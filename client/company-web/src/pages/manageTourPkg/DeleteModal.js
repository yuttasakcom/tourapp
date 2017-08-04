import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import * as actions from '../../actions'

class DeleteModal extends PureComponent {
  render() {
    const { showModal, closeDeletePkgModal, deletePkg, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeDeletePkgModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Tour Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Are you sure to delete package {pkg.name} ?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDeletePkgModal}>No</Button>
          <Button bsStyle="danger" onClick={() => deletePkg(pkg)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ pkg }) => ({
  showModal: pkg.showDeletePkgModal,
  pkg: pkg.pkgs[pkg.selectedPkg]
})

export default connect(mapStateToProps, actions)(DeleteModal)
