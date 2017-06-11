import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import RequestForm from './RequestForm'
import * as actions from '../../actions'

class RequestModal extends PureComponent {
  onSubmit = values => {
    this.props.requestAgent(values)
  }

  render() {
    const { showModal, closeRequestAgentModal } = this.props
    return (
      <Modal show={showModal} onHide={closeRequestAgentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Agent</Modal.Title>
        </Modal.Header>
        <RequestForm onSubmit={this.onSubmit} closeModal={closeRequestAgentModal} />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.agent.showRequestAgentModal
})

export default connect(mapStateToProps, actions)(RequestModal)
