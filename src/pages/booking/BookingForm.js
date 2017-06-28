import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import renderField from '../../components/renderField'

class BookingForm extends PureComponent {
  render() {
    const { handleSubmit, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Field
                name="name"
                component={renderField}
                label="Name"
                type="text"
              />
            </div>
            <div className="col-md-6">
              <Field
                name="phoneNumber"
                component={renderField}
                label="Phone"
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
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="child"
                component={renderField}
                label="Child"
                type="text"
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
          <Button bsStyle="primary" type="submit">Save</Button>
        </Modal.Footer>
      </form>
    )
  }
}

export default reduxForm({ form: 'booking ' })(BookingForm)
