import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import * as actions from '../../../actions/agents'

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

const mapStateToProps = ({ agent: { company } }) => ({
  showModal: company.showDeleteCompanyModal,
  company: company.companies[company.selectedCompany]
})

export default connect(mapStateToProps, actions)(DeleteModal)
