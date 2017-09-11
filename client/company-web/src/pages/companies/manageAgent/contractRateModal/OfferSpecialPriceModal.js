import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import OfferSpecialPriceForm from './OfferSpecialPriceForm'
import * as actions from '../../../actions'

class OfferSpecialPriceModal extends PureComponent {
  onSubmit = values => {
    const { agentId, pkg, offerSpecialPrice } = this.props
    offerSpecialPrice(agentId, pkg, values)
  }

  render() {
    const { showModal, closeOfferSpecialPriceModal, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeOfferSpecialPriceModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Offer Special Price {pkg.name}
          </Modal.Title>
        </Modal.Header>
        <OfferSpecialPriceForm
          onSubmit={this.onSubmit}
          closeModal={closeOfferSpecialPriceModal}
          initialValues={pkg}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent }) => ({
  showModal: agent.showOfferSpecialPriceModal,
  pkg: agent.selectedAgentContractRates[agent.selectedOfferSpecialPricePkg],
  agentId: agent.selectedAgent
})

export default connect(mapStateToProps, actions)(OfferSpecialPriceModal)
