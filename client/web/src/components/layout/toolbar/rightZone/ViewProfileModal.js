import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import DisplayField from '../../../../components/DisplayField'

class ViewProfileModal extends React.PureComponent {
  render() {
    const {
      closeViewProfileModal,
      showModal,
      profile,
      accept,
      rejectRequest
    } = this.props

    if (!profile) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeViewProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayField label="name" text={profile.name} />
          <DisplayField label="email" text={profile.email} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={() => accept(profile._id)}>
            Accept
          </Button>
          <Button bsStyle="danger" onClick={() => rejectRequest(profile._id)}>
            Reject
          </Button>
          <Button onClick={closeViewProfileModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ViewProfileModal
