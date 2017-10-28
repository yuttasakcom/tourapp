import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import Table from './Table'
import OfferSpecialPriceModal from './OfferSpecialPriceModal'
import ResetPriceModal from './ResetPriceModal'

class ContractRateModal extends PureComponent {
  state = {
    showOfferSpecialPriceModal: false,
    showResetPriceModal: false
  }

  render() {
    const { showModal, closeModal, agent } = this.props

    if (!agent) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agent {agent.email} Contract Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            openOfferSpecialPriceModal={() =>
              this.setState({ showOfferSpecialPriceModal: true })}
            openResetPriceModal={() =>
              this.setState({ showResetPriceModal: true })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
        <OfferSpecialPriceModal
          showModal={this.state.showOfferSpecialPriceModal}
          closeModal={() =>
            this.setState({ showOfferSpecialPriceModal: false })}
        />
        <ResetPriceModal
          showModal={this.state.showResetPriceModal}
          closeModal={() => this.setState({ showResetPriceModal: false })}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { agent } }) => {
  return {
    agent: agent.agents[agent.selectedAgent]
  }
}

export default connect(mapStateToProps)(ContractRateModal)
