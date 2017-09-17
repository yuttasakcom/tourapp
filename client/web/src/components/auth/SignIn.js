import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../renderField'

class SignIn extends React.PureComponent {
  render() {
    const { active, handleSubmit, submitting } = this.props
    return (
      <div className={`tab-pane${active ? ' active' : ''}`} id="Login">
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
            <div className="col-sm-offset-1 col-sm-10">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={submitting}
              >
                Submit
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
  return errors
}

export default reduxForm({ form: 'signIn', validate })(SignIn)
