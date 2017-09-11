import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import TourPkgForm from './TourPkgForm'
import * as actions from '../../../actions/companies'

class AddModal extends PureComponent {
  onSubmit = values => {
    this.props.addPkg(values)
  }

  render() {
    const { showModal, closeAddPkgModal } = this.props
    return (
      <Modal show={showModal} onHide={closeAddPkgModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tour Package</Modal.Title>
        </Modal.Header>
        <TourPkgForm onSubmit={this.onSubmit} closeModal={closeAddPkgModal} />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.pkg.showAddPkgModal
})

export default connect(mapStateToProps, actions)(AddModal)
