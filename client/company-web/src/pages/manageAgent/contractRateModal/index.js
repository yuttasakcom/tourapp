import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import Table from './Table'
import OfferSpecialPriceModal from './OfferSpecialPriceModal'
import ResetPriceModal from './ResetPriceModal'
import * as actions from '../../../actions'

class ContractRateModal extends PureComponent {
  render() {
    const { showModal, closeContractRateModal, agent } = this.props

    if (!agent) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeContractRateModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Agent {agent.email} Contract Rate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeContractRateModal}>Close</Button>
        </Modal.Footer>
        <OfferSpecialPriceModal />
        <ResetPriceModal />
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent }) => {
  return {
    showModal: agent.showContractRateModal,
    agent: agent.agents[agent.selectedAgent]
  }
}

export default connect(mapStateToProps, actions)(ContractRateModal)
