import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

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

  renderAlternativeLink() {
    let path, text
    if (this.props.title === 'Sign Up') {
      path = '/signin'
      text = 'Sign In'
    } else {
      path = '/signup'
      text = 'Sign Up'
    }

    return (
      <Link to={path}>
        <Button bsStyle="info">{text}</Button>
      </Link>
    )
  }

  render() {
    const { handleSubmit, title, description } = this.props

    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <Card title={title} description={description}>
          <form onSubmit={handleSubmit}>
            <div className="row">
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
                type="password"
              />
            </div>
            <div className="row pull-right">
              <Button bsStyle="primary" type="submit">
                Submit
              </Button>
              {this.renderAlternativeLink()}
            </div>
          </form>
        </Card>
      </div>
    )
  }
}

export default reduxForm({ form: 'auth' })(AuthForm)
