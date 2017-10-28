import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import RequestForm from './RequestForm'
import actions from '../../../state/ducks/actions'

class RequestModal extends PureComponent {
  onSubmit = values => {
    this.props.requestAgent(values._id)
    this.props.closeModal()
  }

  render() {
    const { showModal, closeModal } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Agent</Modal.Title>
        </Modal.Header>
        <RequestForm onSubmit={this.onSubmit} closeModal={closeModal} />
      </Modal>
    )
  }
}

export default connect(null, actions.company.agent)(RequestModal)
