import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import moment from 'moment'

import DisplayField from '../../../components/DisplayField'
import * as actions from '../../../actions'
import {
  waiting,
  readed,
  accepted,
  rejected
} from '../../../actions/bookingStatus'

class ManageModal extends PureComponent {
  renderBookingAction() {
    const {
      booking: { _id, status },
      acceptBooking,
      rejectBooking,
      completeBooking
    } = this.props
    const reject = (
      <Button key="1" onClick={() => rejectBooking(_id)} bsStyle="danger">
        Reject
      </Button>
    )
    const accept = (
      <Button key="2" onClick={() => acceptBooking(_id)} bsStyle="primary">
        Accept
      </Button>
    )
    const complete = (
      <Button key="3" onClick={() => completeBooking(_id)} bsStyle="info">
        Complete
      </Button>
    )
    const actions = []
    switch (status) {
      case waiting:
      case readed:
        actions.push(reject, accept)
        break

      case accepted:
        actions.push(reject, complete)
        break

      case rejected:
        actions.push(accept)
        break

      default:
        actions.push(reject)
        break
    }
    return actions
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
          <DisplayField label="Agent name" text={booking.agent.name} />
          <DisplayField label="Agent email" text={booking.agent.email} />
          <DisplayField label="Package" text={booking.pkg.name} />
          <DisplayField label="Customer name" text={booking.tourist.name} />
          <DisplayField label="Telephone" text={booking.tourist.phoneNumber} />
          <DisplayField label="Email" text={booking.tourist.email} />
          <DisplayField label="Hotel" text={booking.tourist.hotel} />
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
          <Button onClick={closeManageBookingModal}>Close</Button>
          {this.renderBookingAction()}
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
