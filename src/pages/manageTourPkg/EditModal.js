import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import TourPkgForm from './TourPkgForm'
import * as actions from '../../actions'

class AddModal extends PureComponent {
  onSubmit = values => {
    this.props.addPkg(values)
  }

  render() {
    const { showModal, closeEditPkgModal } = this.props
    return (
      <Modal show={showModal} onHide={closeEditPkgModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour Package</Modal.Title>
        </Modal.Header>
        <TourPkgForm onSubmit={this.onSubmit} closeModal={closeEditPkgModal} />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.pkg.showEditPkgModal
})

export default connect(mapStateToProps, actions)(AddModal)
