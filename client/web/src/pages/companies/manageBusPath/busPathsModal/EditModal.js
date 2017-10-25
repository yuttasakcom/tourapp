import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import map from 'lodash/map'

import BusPathForm from './BusPathForm'
import actions from '../../../../state/ducks/actions'

class EditModal extends PureComponent {
  onSubmit = values => {
    const updatedValues = { ...values, hotels: map(values.hotels, 'value') }
    this.props.editBusPath(this.props.busPath, updatedValues)
  }

  render() {
    const { showModal, closeModal, busPath } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bus Path</Modal.Title>
        </Modal.Header>
        <BusPathForm
          onSubmit={this.onSubmit}
          closeModal={closeModal}
          initialValues={busPath}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { busPath } }) => ({
  busPath: busPath.busPaths[busPath.selectedBusPath]
})

export default connect(mapStateToProps, actions.company.busPath)(EditModal)
