import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import * as actions from '../../actions'

class DeleteModal extends PureComponent {
  onSubmit = pkg => {
    this.props.deletePkg(pkg)
  }

  render() {
    const { showModal, closeDeletePkgModal } = this.props
    return (
      <Modal show={showModal} onHide={closeDeletePkgModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Tour Package</Modal.Title>
        </Modal.Header>
        <Modal.Body />
        <Modal.Footer>
          <Button onClick={closeDeletePkgModal}>Close</Button>
          <Button bsStyle="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.ui.pkg.showDeletePkgModal
})

export default connect(mapStateToProps, actions)(DeleteModal)
