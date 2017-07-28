import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import renderField from '../../components/renderField'

class TourPkgForm extends PureComponent {
  render() {
    const { handleSubmit, reset, pristine, submitting, closeModal } = this.props

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
                name="priceAdultRecommended"
                component={renderField}
                label="Recommended Adult Price"
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
            <div className="col-md-6">
              <Field
                name="priceChildRecommended"
                component={renderField}
                label="Recommended Child Price"
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
  if (!values.priceAdult) {
    errors.priceAdult = 'Required'
  } else if (isNaN(Number(values.priceAdult))) {
    errors.priceAdult = 'Must be a number'
  }
  if (!values.priceChild) {
    errors.priceChild = 'Required'
  } else if (isNaN(Number(values.priceChild))) {
    errors.priceChild = 'Must be a number'
  }
  return errors
}

export default reduxForm({ form: 'tourPkg', validate })(TourPkgForm)
