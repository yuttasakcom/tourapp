import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import Modal from 'react-bootstrap/lib/Modal'

import BusPathForm from './BusPathForm'
import * as actions from '../../../actions'

class AddModal extends PureComponent {
  onSubmit = values => {
    const updatedValues = {
      ...values,
      hotels: map(values.hotels, 'value'),
      pkg: this.props.selectedPkg
    }
    this.props.addBusPath(updatedValues)
  }

  render() {
    const { showModal, closeAddBusPathModal } = this.props
    return (
      <Modal show={showModal} onHide={closeAddBusPathModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bus Path</Modal.Title>
        </Modal.Header>
        <BusPathForm
          onSubmit={this.onSubmit}
          closeModal={closeAddBusPathModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({
  busPath: { showAddBusPathModal, selectedPkg }
}) => ({
  showModal: showAddBusPathModal,
  selectedPkg
})

export default connect(mapStateToProps, actions)(AddModal)
