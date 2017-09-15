import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import * as actions from '../../../actions/agents'

class DeleteModal extends PureComponent {
  render() {
    const {
      showModal,
      closeDeleteEmployeeModal,
      deleteEmployee,
      employee
    } = this.props

    if (!employee) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeDeleteEmployeeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete employee {employee.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDeleteEmployeeModal}>No</Button>
          <Button bsStyle="danger" onClick={() => deleteEmployee(employee)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent: { employee } }) => ({
  showModal: employee.showDeleteEmployeeModal,
  employee: employee.employees[employee.selectedEmployee]
})

export default connect(mapStateToProps, actions)(DeleteModal)
