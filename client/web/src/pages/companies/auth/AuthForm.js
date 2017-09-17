import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-bootstrap/lib/Button'

import Card from '../../../components/Card'
import renderField from '../../../components/renderField'

class AuthForm extends PureComponent {
  render() {
    const { handleSubmit, submitting, title, description } = this.props

    return (
      <div className="container-fluid">
        <Card title={title} description={description}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <Field
                name="email"
                component={renderField}
                label="Email"
                type="text"
              />
              <Field
                name="password"
                component={renderField}
                label="Password"
                type="password"
              />
              {title === 'Sign Up' ? (
                <Field
                  name="name"
                  component={renderField}
                  label="Name"
                  type="text"
                />
              ) : null}
            </div>
            <div className="row pull-right">
              <Button bsStyle="primary" type="submit" disabled={submitting}>
                Submit
              </Button>
            </div>
          </form>
        </Card>
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

export default reduxForm({ form: 'companyAuth', validate })(AuthForm)
