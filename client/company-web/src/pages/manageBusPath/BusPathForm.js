import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import renderField from '../../components/renderField'

class BusPathForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      closeModal,
      hotels
    } = this.props

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
            <div className="col-md-12">
              <Field
                muti
                name="hotels"
                component={renderField}
                options={hotels}
                label="Hotel"
                type="select"
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
  return errors
}

const mapStateToProps = ({ busPath: { hotels } }) => ({
  hotels: hotels.map(hotel => ({
    value: hotel._id,
    label: hotel.name
  }))
})

export default connect(mapStateToProps)(
  reduxForm({ form: 'busPath', validate })(BusPathForm)
)
