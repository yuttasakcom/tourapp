import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import * as actions from '../../actions'

class DeleteModal extends PureComponent {
  render() {
    const {
      showModal,
      closeDeleteCompanyModal,
      deleteCompany,
      company
    } = this.props

    if (!company) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeDeleteCompanyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete company {company.email} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDeleteCompanyModal}>No</Button>
          <Button bsStyle="danger" onClick={() => deleteCompany(company)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ company }) => ({
  showModal: company.showDeleteCompanyModal,
  company: company.companies[company.selectedCompany]
})

export default connect(mapStateToProps, actions)(DeleteModal)
