import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'

import EmployeeForm from './EmployeeForm'
import actions from '../../../state/ducks/actions'

class AddModal extends PureComponent {
  onSubmit = values => {
    this.props.addEmployee(values)
  }

  render() {
    const { showModal, closeModal } = this.props
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <EmployeeForm onSubmit={this.onSubmit} closeModal={closeModal} />
      </Modal>
    )
  }
}

export default connect(null, actions.agent.employee)(AddModal)
