import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import TourPkgForm from './TourPkgForm'
import * as actions from '../../actions'

class AddModal extends Component {
  onSubmit = values => {
    this.props.addPackage(values)
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

export default connect(null, actions)(AddModal)
