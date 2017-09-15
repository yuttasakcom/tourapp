import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import TourPkgForm from './TourPkgForm'
import * as actions from '../../../actions/companies'

class EditModal extends PureComponent {
  onSubmit = values => {
    this.props.editPkg(this.props.pkg, values)
  }

  render() {
    const { showModal, closeEditPkgModal, pkg } = this.props
    return (
      <Modal show={showModal} onHide={closeEditPkgModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour Package</Modal.Title>
        </Modal.Header>
        <TourPkgForm
          onSubmit={this.onSubmit}
          closeModal={closeEditPkgModal}
          initialValues={pkg}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { pkg } }) => ({
  showModal: pkg.showEditPkgModal,
  pkg: pkg.pkgs[pkg.selectedPkg]
})

export default connect(mapStateToProps, actions)(EditModal)
