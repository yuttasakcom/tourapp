import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import renderField from '../../components/renderField'

class EmployeeForm extends PureComponent {
  render() {
    const { handleSubmit, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <Field
                name="name"
                component={renderField}
                label="Name"
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="phoneNumber"
                component={renderField}
                label="Phone Number"
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="email"
                component={renderField}
                label="Email"
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="password"
                component={renderField}
                label="Password"
                type="text"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
          <Button bsStyle="primary" type="submit">Save</Button>
        </Modal.Footer>
      </form>
    )
  }
}

export default reduxForm({ form: 'employee' })(EmployeeForm)
