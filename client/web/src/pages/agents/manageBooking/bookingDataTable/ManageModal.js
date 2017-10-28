import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import moment from 'moment'

import DisplayField from '../../../../components/DisplayField'
import * as actions from '../../../../actions/agents'

class ManageModal extends PureComponent {
  render() {
    const { showModal, closeModal, booking } = this.props

    if (!booking) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayField label="Company name" text={booking.company.name} />
          <DisplayField label="Company email" text={booking.company.email} />
          <DisplayField
            label="Company phone number"
            text={booking.company.phoneNumber}
          />
          <DisplayField label="Package" text={booking.pkg.name} />
          <DisplayField label="Customer name" text={booking.tourist.name} />
          <DisplayField label="Telephone" text={booking.tourist.phoneNumber} />
          <DisplayField label="Email" text={booking.tourist.email} />
          <DisplayField label="Hotel" text={booking.tourist.hotel.name} />
          <DisplayField label="Room Number" text={booking.tourist.roomNumber} />
          <DisplayField label="Address" text={booking.tourist.address} />
          <DisplayField
            label="Nationality"
            text={booking.tourist.nationality}
          />
          <DisplayField label="Adult" text={booking.tourist.adult} />
          <DisplayField label="Child" text={booking.tourist.child} />
          <DisplayField
            label="Date"
            text={moment(booking.tourist.date).format('DD/MM/YYYY HH:mm:ss')}
          />
          <DisplayField label="Note" text={booking.tourist.note} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent: { manageBooking } }) => ({
  booking: manageBooking.bookings[manageBooking.selectedBooking]
})

export default connect(mapStateToProps, actions)(ManageModal)
