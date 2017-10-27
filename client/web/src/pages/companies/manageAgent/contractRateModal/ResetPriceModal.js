import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import actions from '../../../../state/ducks/actions'

class ResetPriceModal extends PureComponent {
  render() {
    const { showModal, closeModal, resetPrice, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Price Package {pkg.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to reset price package {pkg.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>No</Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              resetPrice()
              closeModal()
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { agent } }) => ({
  pkg: agent.selectedAgentContractRates[agent.selectedOfferSpecialPricePkg]
})

export default connect(mapStateToProps, actions.company.agent)(ResetPriceModal)
