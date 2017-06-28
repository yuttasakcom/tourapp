import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import moment from 'moment'

import BookingForm from './BookingForm'
import * as actions from '../../actions'

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
    const { showModal, closeAddBookingModal } = this.props
    return (
      <Modal show={showModal} onHide={closeAddBookingModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Booking Detail</Modal.Title>
        </Modal.Header>
        <BookingForm
          initialValues={{ date: moment() }}
          onSubmit={this.onSubmit}
          closeModal={closeAddBookingModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ booking }) => {
  return {
    showModal: booking.showAddBookingModal,
    pkg: booking.pkgs[booking.selectedPkg]
  }
}

export default connect(mapStateToProps, actions)(AddModal)
