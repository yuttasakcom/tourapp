import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import EmployeeForm from './EmployeeForm'
import * as actions from '../../actions'

class EditModal extends PureComponent {
  onSubmit = values => {
    const { editEmployee, employee } = this.props
    editEmployee(employee, values)
  }

  render() {
    const { showModal, closeEditEmployeeModal, employee } = this.props
    return (
      <Modal show={showModal} onHide={closeEditEmployeeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <EmployeeForm
          onSubmit={this.onSubmit}
          closeModal={closeEditEmployeeModal}
          initialValues={employee}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ employee }) => ({
  showModal: employee.showEditEmployeeModal,
  employee: employee.employees[employee.selectedEmployee]
})

export default connect(mapStateToProps, actions)(EditModal)
