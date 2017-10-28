import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import EmployeeForm from './EmployeeForm'
import actions from '../../../state/ducks/actions'

class EditModal extends PureComponent {
  onSubmit = values => {
    const { editEmployee, employee, closeModal } = this.props
    editEmployee(employee, values)
    closeModal()
  }

  render() {
    const { showModal, closeModal, employee } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <EmployeeForm
          onSubmit={this.onSubmit}
          closeModal={closeModal}
          initialValues={employee}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent: { employee } }) => ({
  employee: employee.employees[employee.selectedEmployee]
})

export default connect(mapStateToProps, actions.agent.employee)(EditModal)
