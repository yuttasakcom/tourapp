import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import renderField from '../../../../components/renderField'

class OfferSpecialPriceForm extends PureComponent {
  render() {
    const { handleSubmit, pristine, reset, submitting, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
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
  if (!values.priceAdult) {
    errors.priceAdult = 'Required'
  } else if (isNaN(Number(values.priceAdult))) {
    errors.priceAdult = 'Must be a Number'
  }
  if (!values.priceChild) {
    errors.priceChild = 'Required'
  } else if (isNaN(Number(values.priceChild))) {
    errors.priceChild = 'Must be a Number'
  }
  return errors
}

export default reduxForm({ form: 'offerSpecialPrice', validate })(
  OfferSpecialPriceForm
)
