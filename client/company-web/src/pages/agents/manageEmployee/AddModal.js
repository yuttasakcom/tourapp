import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import EmployeeForm from './EmployeeForm'
import * as actions from '../../../actions/agents'

class AddModal extends PureComponent {
  onSubmit = values => {
    this.props.addEmployee(values)
  }

  render() {
    const { showModal, closeAddEmployeeModal } = this.props
    return (
      <Modal show={showModal} onHide={closeAddEmployeeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <EmployeeForm
          onSubmit={this.onSubmit}
          closeModal={closeAddEmployeeModal}
        />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  showModal: state.employee.showAddEmployeeModal
})

export default connect(mapStateToProps, actions)(AddModal)
