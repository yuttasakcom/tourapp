import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import DisplayField from './DisplayField'
import * as actions from '../../../actions'

class ManageModal extends PureComponent {
  render() {
    const {
      showModal,
      closeManageBookingModal,
      booking,
      acceptBooking,
      rejectBooking
    } = this.props

    if (!booking) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeManageBookingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayField label="Agent" text={booking.agent.email} />
          <DisplayField label="Package" text={booking.pkg.name} />
          <DisplayField label="Customer name" text={booking.tourist.name} />
          <DisplayField label="Telephone" text={booking.tourist.phoneNumber} />
          <DisplayField
            label="Hotel name/Address"
            text={booking.tourist.hotel}
          />
          <DisplayField
            label="Nationality"
            text={booking.tourist.nationality}
          />
          <DisplayField label="Adult" text={booking.tourist.adult} />
          <DisplayField label="Child" text={booking.tourist.child} />
          <DisplayField label="Date" text={booking.tourist.date} />
          <DisplayField label="Note" text={booking.tourist.note} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeManageBookingModal}>Close</Button>
          <Button onClick={() => rejectBooking(booking._id)} bsStyle="danger">
            Reject
          </Button>
          <Button onClick={() => acceptBooking(booking._id)} bsStyle="primary">
            Accept
          </Button>
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
