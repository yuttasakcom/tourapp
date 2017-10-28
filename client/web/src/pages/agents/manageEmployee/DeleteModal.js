import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import actions from '../../../state/ducks/actions'

class DeleteModal extends PureComponent {
  render() {
    const { showModal, closeModal, deleteEmployee, employee } = this.props

    if (!employee) {
      return null
    }

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete employee {employee.name} ?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>No</Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              deleteEmployee(employee)
              closeModal()
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ agent: { employee } }) => ({
  employee: employee.employees[employee.selectedEmployee]
})

export default connect(mapStateToProps, actions.agent.employee)(DeleteModal)
