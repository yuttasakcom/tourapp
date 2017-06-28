import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import renderField from '../../components/renderField'

class RequestForm extends PureComponent {
  render() {
    const { handleSubmit, closeModal } = this.props

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
          <Button bsStyle="primary" type="submit">Request</Button>
        </Modal.Footer>
      </form>
    )
  }
}

export default reduxForm({ form: 'requestCompany' })(RequestForm)
