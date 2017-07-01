import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import renderField from '../../components/renderField'

class EmployeeForm extends PureComponent {
  render() {
    const { handleSubmit, pristine, reset, submitting, closeModal } = this.props

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
          <Button
            bsStyle="info"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset
          </Button>
          <Button bsStyle="primary" type="submit" disabled={submitting}>
            Save
          </Button>
        </Modal.Footer>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

export default reduxForm({ form: 'employee', validate })(EmployeeForm)
