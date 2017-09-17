import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../renderField'

class SignUp extends React.PureComponent {
  render() {
    const { active, onCancelClick, handleSubmit, submitting } = this.props
    return (
      <div className={`tab-pane${active ? ' active' : ''}`}>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="email"
                component={renderField}
                label="Email"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="password"
                component={renderField}
                label="Password"
                type="password"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="name"
                component={renderField}
                label="Name"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="address"
                component={renderField}
                label="Address"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="phoneNumber"
                component={renderField}
                label="Phone Number"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="adminName"
                component={renderField}
                label="Admin Name"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-1 col-md-10">
              <Field
                name="adminPhoneNumber"
                component={renderField}
                label="Admin Phone Number"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-offset-1 col-sm-10">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-sm"
              >
                Save & Continue
              </button>
              <button
                onClick={onCancelClick}
                type="button"
                className="btn btn-default btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.address) {
    errors.address = 'Required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  }
  if (!values.adminName) {
    errors.adminName = 'Required'
  }
  if (!values.adminPhoneNumber) {
    errors.adminPhoneNumber = 'Required'
  }
  return errors
}

export default reduxForm({ form: 'signUp', validate })(SignUp)
