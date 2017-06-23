import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import DataTable from '../../components/dataTable'
import OfferSpecialPriceModal from './OfferSpecialPriceModal'
import ResetPriceModal from './ResetPriceModal'
import * as actions from '../../actions'

class ContractRateModal extends PureComponent {
  renderTableBody = () => {
    const {
      contractRates,
      openOfferSpecialPriceModal,
      openResetPriceModal
    } = this.props

    if (!contractRates) {
      return null
    }

    return _.map(contractRates, contractRate =>
      <tr key={contractRate._id}>
        <td>{contractRate._id}</td>
        <td>{contractRate.name}</td>
        <td>{contractRate.priceAdult.toLocaleString()}</td>
        <td>{contractRate.priceChild.toLocaleString()}</td>
        <td style={{ textAlign: 'center' }}>
          <button
            className="btn btn-info btn-sm"
            onClick={() => openOfferSpecialPriceModal(contractRate._id)}
          >
            Offer Special Price
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => openResetPriceModal(contractRate._id)}
          >
            Reset
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const { showModal, closeContractRateModal, agent } = this.props

    if (!agent) {
      return null
    }

    const tableTitles = ['_id', 'Name', 'Adult Price', 'Child Price']

    return (
      <Modal show={showModal} onHide={closeContractRateModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agent {agent.email} Contract Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            tableTitles={tableTitles}
            renderTableBody={this.renderTableBody}
          />
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
    agent: agent.agents[agent.selectedAgent],
    contractRates: agent.selectedAgentContractRates
  }
}

export default connect(mapStateToProps, actions)(ContractRateModal)
