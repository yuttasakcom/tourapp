import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import OfferSpecialPriceForm from './OfferSpecialPriceForm'
import actions from '../../../../state/ducks/actions'

class OfferSpecialPriceModal extends PureComponent {
  onSubmit = values => {
    this.props.offerSpecialPrice(values)
    this.props.closeModal()
  }

  render() {
    const { showModal, closeModal, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Offer Special Price {pkg.name}</Modal.Title>
        </Modal.Header>
        <OfferSpecialPriceForm
          onSubmit={this.onSubmit}
          closeModal={closeModal}
          initialValues={pkg}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { agent } }) => ({
  pkg: agent.selectedAgentContractRates[agent.selectedOfferSpecialPricePkg]
})

export default connect(mapStateToProps, actions.company.agent)(
  OfferSpecialPriceModal
)
