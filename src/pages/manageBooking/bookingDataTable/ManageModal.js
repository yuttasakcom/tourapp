import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import * as actions from '../../../actions'

class ManageModal extends PureComponent {
  onSubmit = values => {
    this.props.editPkg(this.props.pkg, values)
  }

  render() {
    const { showModal, closeManageBookingModal, booking } = this.props
    if (!booking) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeManageBookingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {booking.pkg.name}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeManageBookingModal}>Close</Button>
          <Button bsStyle="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ booking }) => ({
  showModal: booking.showManageBookingModal,
  booking: booking.bookings[booking.selectedBooking]
})

export default connect(mapStateToProps, actions)(ManageModal)
