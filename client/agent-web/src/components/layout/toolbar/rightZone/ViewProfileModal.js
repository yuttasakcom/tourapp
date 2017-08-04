import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import DisplayField from '../../../../components/DisplayField'
import * as actions from '../../../../actions'

class ViewProfileModal extends PureComponent {
  render() {
    const {
      closeViewCompanyProfileModal,
      showModal,
      company,
      acceptCompany,
      rejectRequestCompany,
      fetchCompanies
    } = this.props

    if (!company) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeViewCompanyProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Company Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayField label="Company name" text={company.name} />
          <DisplayField label="Company email" text={company.email} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="info"
            onClick={() => acceptCompany(company._id, fetchCompanies)}
          >
            Accept
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => rejectRequestCompany(company._id)}
          >
            Reject
          </Button>
          <Button onClick={closeViewCompanyProfileModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ notification }) => ({
  showModal: notification.showViewCompanyProfileModal,
  company: notification.acceptPendings[notification.selectedAcceptPending]
})

export default connect(mapStateToProps, actions)(ViewProfileModal)
