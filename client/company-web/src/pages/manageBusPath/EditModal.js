import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import BusPathForm from './BusPathForm'
import * as actions from '../../actions'

class EditModal extends PureComponent {
  onSubmit = values => {
    this.props.editBusPath(this.props.busPath, values)
  }

  render() {
    const { showModal, closeEditBusPathModal, busPath } = this.props
    return (
      <Modal show={showModal} onHide={closeEditBusPathModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bus Path</Modal.Title>
        </Modal.Header>
        <BusPathForm
          onSubmit={this.onSubmit}
          closeModal={closeEditBusPathModal}
          initialValues={busPath}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ busPath }) => ({
  showModal: busPath.showEditBusPathModal,
  busPath: busPath.busPaths[busPath.selectedBusPath]
})

export default connect(mapStateToProps, actions)(EditModal)
