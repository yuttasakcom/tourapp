import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import TourPkgForm from '../TourPkgForm'
import actions from '../../../../state/ducks/actions'

class AddModal extends PureComponent {
  onSubmit = values => {
    this.props.addPkg(values)
    this.props.closeModal()
  }

  render() {
    const { showModal, closeModal } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tour Package</Modal.Title>
        </Modal.Header>
        <TourPkgForm onSubmit={this.onSubmit} closeModal={closeModal} />
      </Modal>
    )
  }
}

export default connect(null, actions.company.pkg)(AddModal)
