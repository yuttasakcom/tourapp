import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import actions from '../../../state/ducks/actions'

class DeleteModal extends PureComponent {
  render() {
    const { showModal, closeModal, deleteAgent, agent } = this.props

    if (!agent) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete agent {agent.email} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>No</Button>
          <Button bsStyle="danger" onClick={() => deleteAgent(agent)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { agent } }) => ({
  agent: agent.agents[agent.selectedAgent]
})

export default connect(mapStateToProps, actions.company.agent)(DeleteModal)
