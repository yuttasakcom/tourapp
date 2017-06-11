import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Button, Modal } from 'react-bootstrap'

class RequestForm extends PureComponent {
  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <div className="form-group label-floating">
        <label className="control-label">{label}</label>
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-control"
        />
      </div>
    )
  }

  render() {
    const { handleSubmit, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <Field
                name="_id"
                component={this.renderField}
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

export default reduxForm({ form: 'requestAgent' })(RequestForm)
