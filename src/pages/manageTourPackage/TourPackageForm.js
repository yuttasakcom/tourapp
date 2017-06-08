import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { Button, Modal } from 'react-bootstrap'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div className="form-group label-floating">
    <label className="control-label">{label}</label>
    <input
      {...input}
      placeholder={label}
      type={type}
      className="form-control"
    />
  </div>

const TourPackageForm = props => {
  const { handleSubmit } = props

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
              name="description"
              component={renderField}
              label="Description"
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="priceAdult"
              component={renderField}
              label="Adult Price"
              type="text"
            />
          </div>
          <div className="col-md-6">
            <Field
              name="priceChild"
              component={renderField}
              label="Child Price"
              type="text"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeModal}>Close</Button>
        <Button bsStyle="primary" type="submit">Save</Button>
      </Modal.Footer>
    </form>
  )
}

export default reduxForm({ form: 'tourPackage' })(TourPackageForm)
