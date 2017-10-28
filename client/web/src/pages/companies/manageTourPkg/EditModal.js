import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import TourPkgForm from './TourPkgForm'
import actions from '../../../state/ducks/actions'

class EditModal extends PureComponent {
  onSubmit = values => {
    const { editPkg, closeModal, pkg } = this.props
    editPkg({ id: pkg._id, values })
    closeModal()
  }

  render() {
    const { showModal, closeModal, pkg } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour Package</Modal.Title>
        </Modal.Header>
        <TourPkgForm
          onSubmit={this.onSubmit}
          closeModal={closeModal}
          initialValues={pkg}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ company: { pkg } }) => ({
  pkg: pkg.pkgs[pkg.selectedPkg]
})

export default connect(mapStateToProps, actions.company.pkg)(EditModal)
