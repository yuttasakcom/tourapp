import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import moment from 'moment'

import BookingForm from './BookingForm'
import * as actions from '../../../actions/agents'

class AddModal extends PureComponent {
  onSubmit = values => {
    const { addBooking, pkg } = this.props
    const bookingProps = {
      company: pkg.company._id,
      pkg,
      tourist: values
    }
    addBooking(bookingProps)
  }

  render() {
    const { showModal, closeAddBookingModal, pkg } = this.props

    if (!pkg) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeAddBookingModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Add Booking Detail
            <br />
            Package: {pkg.name} Company: {pkg.company.name}
          </Modal.Title>
        </Modal.Header>
        <BookingForm
          initialValues={{ date: moment(), adult: 1, child: 0 }}
          onSubmit={this.onSubmit}
          closeModal={closeAddBookingModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent: { booking } }) => {
  return {
    showModal: booking.showAddBookingModal,
    pkg: booking.pkgs[booking.selectedPkg]
  }
}

export default connect(mapStateToProps, actions)(AddModal)
