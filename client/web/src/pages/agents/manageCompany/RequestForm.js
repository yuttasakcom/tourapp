import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import renderField from '../../../components/renderField'

class RequestForm extends PureComponent {
  render() {
    const { handleSubmit, pristine, reset, submitting, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <Field
                name="_id"
                component={renderField}
                label="_id"
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
            Request
          </Button>
        </Modal.Footer>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values._id) {
    errors._id = 'Required'
  } else if (!/^[0-9a-fA-F]{24}$/.test(values._id)) {
    errors._id = 'Invalid code'
  }
  return errors
}

export default reduxForm({ form: 'requestCompany', validate })(RequestForm)
