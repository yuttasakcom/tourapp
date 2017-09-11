import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import RequestForm from './RequestForm'
import * as actions from '../../../actions/agents'

class RequestModal extends PureComponent {
  onSubmit = values => {
    const { requestCompany, fetchRequestPendings } = this.props
    requestCompany(values, fetchRequestPendings)
  }

  render() {
    const { showModal, closeRequestCompanyModal } = this.props
    return (
      <Modal show={showModal} onHide={closeRequestCompanyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Company</Modal.Title>
        </Modal.Header>
        <RequestForm
          onSubmit={this.onSubmit}
          closeModal={closeRequestCompanyModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.company.showRequestCompanyModal
})

export default connect(mapStateToProps, actions)(RequestModal)
