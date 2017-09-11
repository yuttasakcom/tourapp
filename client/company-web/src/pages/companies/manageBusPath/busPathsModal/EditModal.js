import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import map from 'lodash/map'

import BusPathForm from './BusPathForm'
import * as actions from '../../../../actions/companies'

class EditModal extends PureComponent {
  onSubmit = values => {
    const updatedValues = { ...values, hotels: map(values.hotels, 'value') }
    this.props.editBusPath(this.props.busPath, updatedValues)
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
