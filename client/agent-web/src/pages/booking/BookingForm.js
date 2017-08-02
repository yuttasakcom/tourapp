import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import renderField from '../../components/renderField'

class BookingForm extends PureComponent {
  render() {
    const { handleSubmit, reset, pristine, submitting, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <Field
                name="name"
                component={renderField}
                label="Name"
                type="text"
              />
            </div>
            <div className="col-md-4">
              <Field
                name="phoneNumber"
                component={renderField}
                label="Phone"
                type="text"
              />
            </div>
            <div className="col-md-4">
              <Field
                name="email"
                component={renderField}
                label="Email"
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="hotel"
                component={renderField}
                label="Hotel Name/Address"
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="adult"
                component={renderField}
                label="Adult"
                type="number"
                min="1"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="child"
                component={renderField}
                label="Child"
                type="number"
                min="0"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="nationality"
                component={renderField}
                label="Nationality"
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="date"
                component={renderField}
                label="Date"
                type="date"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="note"
                component={renderField}
                label="Note"
                type="text"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
          <Button
            bsStyle="info"
            onClick={reset}
            disabled={pristine || submitting}
          >
            Reset
          </Button>
          <Button bsStyle="primary" disabled={submitting} type="submit">
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
  if (!values.hotel) {
    errors.hotel = 'Required'
  }
  if (!values.adult) {
    errors.adult = 'Required'
  } else if (isNaN(Number(values.adult))) {
    errors.adult = 'Must be a number'
  }
  if (values.child && isNaN(Number(values.child))) {
    errors.child = 'Must be a number'
  }
  return errors
}

export default reduxForm({ form: 'booking', validate })(BookingForm)
