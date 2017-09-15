import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import RequestForm from './RequestForm'
import * as actions from '../../../actions/companies'

class RequestModal extends PureComponent {
  onSubmit = values => {
    const { requestAgent, fetchRequestPendings } = this.props
    requestAgent(values, fetchRequestPendings)
  }

  render() {
    const { showModal, closeRequestAgentModal } = this.props
    return (
      <Modal show={showModal} onHide={closeRequestAgentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Agent</Modal.Title>
        </Modal.Header>
        <RequestForm
          onSubmit={this.onSubmit}
          closeModal={closeRequestAgentModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.company.agent.showRequestAgentModal
})

export default connect(mapStateToProps, actions)(RequestModal)
