import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import * as actions from '../../actions'

class ResetPriceModal extends PureComponent {
  render() {
    const {
      showModal,
      closeResetPriceModal,
      resetPrice,
      fetchAgentContractRates,
      pkg,
      agentId
    } = this.props

    if (!pkg) {
      return <div />
    }

    return (
      <Modal show={showModal} onHide={closeResetPriceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Price Package {pkg.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to reset price package {pkg.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeResetPriceModal}>No</Button>
          <Button
            bsStyle="danger"
            onClick={() => resetPrice(agentId, pkg, fetchAgentContractRates)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent }) => ({
  showModal: agent.showResetPriceModal,
  pkg: agent.selectedAgentContractRates[agent.selectedOfferSpecialPricePkg],
  agentId: agent.selectedAgent
})

export default connect(mapStateToProps, actions)(ResetPriceModal)
