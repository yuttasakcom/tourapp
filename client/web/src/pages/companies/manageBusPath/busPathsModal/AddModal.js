import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import Modal from 'react-bootstrap/lib/Modal'

import BusPathForm from './BusPathForm'
import actions from '../../../../state/ducks/actions'

class AddModal extends PureComponent {
  onSubmit = values => {
    const updatedValues = {
      ...values,
      hotels: map(values.hotels, 'value'),
      pkg: this.props.selectedPkg
    }
    this.props.addBusPath(updatedValues)
    this.props.closeModal()
  }

  render() {
    const { showModal, closeModal } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bus Path</Modal.Title>
        </Modal.Header>
        <BusPathForm onSubmit={this.onSubmit} closeModal={closeModal} />
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { busPath: { selectedPkg } } }) => ({
  selectedPkg
})

export default connect(mapStateToProps, actions.company.busPath)(AddModal)
