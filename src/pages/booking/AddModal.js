import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import BookingForm from './BookingForm'
import * as actions from '../../actions'

class AddModal extends PureComponent {
  onSubmit = values => {
    this.props.addBooking(values)
  }

  render() {
    const { showModal, closeAddBookingModal } = this.props
    return (
      <Modal show={showModal} onHide={closeAddBookingModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Booking Detail</Modal.Title>
        </Modal.Header>
        <BookingForm
          onSubmit={this.onSubmit}
          closeModal={closeAddBookingModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.booking.showAddBookingModal
  }
}

export default connect(mapStateToProps, actions)(AddModal)
