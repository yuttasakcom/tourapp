import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'

import Card from '../../components/Card'
import { Button } from 'react-bootstrap'

class AuthForm extends PureComponent {
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
    const { handleSubmit, title, description } = this.props

    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <Card title={title} description={description}>
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              component={this.renderField}
              label="Email"
              type="text"
            />
            <Field
              name="password"
              component={this.renderField}
              label="Password"
              type="text"
            />
            <Button bsStyle="primary pull-right" type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    )
  }
}

export default reduxForm({ form: 'auth' })(AuthForm)
