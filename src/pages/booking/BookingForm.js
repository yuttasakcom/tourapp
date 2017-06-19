import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import RenderField from '../../components/RenderField'

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
                component={RenderField}
                label="Name"
                type="text"
              />
            </div>
            <div className="col-md-6">
              <Field
                name="phoneNumber"
                component={RenderField}
                label="Phone"
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="hotel"
                component={RenderField}
                label="Hotel Name/Address"
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="adult"
                component={RenderField}
                label="Adult"
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="child"
                component={RenderField}
                label="Child"
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="nationality"
                component={RenderField}
                label="Nationality"
                type="text"
              />
            </div>
            <div className="col-md-3">
              <Field
                name="date"
                component={RenderField}
                label="Date"
                type="text"
              />
            </div>
            <div className="col-md-12">
              <Field
                name="note"
                component={RenderField}
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
