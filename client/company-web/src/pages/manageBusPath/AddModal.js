import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import BusPathForm from './BusPathForm'
import * as actions from '../../actions'

class AddModal extends PureComponent {
  componentDidMount() {
    this.props.fetchBusPathHotels()
  }

  onSubmit = values => {
    this.props.addBusPath(values)
  }

  render() {
    const { showModal, closeAddBusPathModal } = this.props
    return (
      <Modal show={showModal} onHide={closeAddBusPathModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bus Path</Modal.Title>
        </Modal.Header>
        <BusPathForm
          onSubmit={this.onSubmit}
          closeModal={closeAddBusPathModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.busPath.showAddBusPathModal
})

export default connect(mapStateToProps, actions)(AddModal)
