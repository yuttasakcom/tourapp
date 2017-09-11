import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button'

import Card from '../../../components/Card'
import Notification from '../../../components/Notification'
import renderField from '../../../components/renderField'

class AuthForm extends PureComponent {
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
    const {
      handleSubmit,
      submitting,
      title,
      description,
      authenticated,
      location
    } = this.props
    const { from } = location.state || {
      from: { pathname: '/companies/dashboard' }
    }

    if (authenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <Card title={title} description={description}>
          <Notification />
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
              {this.renderAlternativeLink()}
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

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated }
}

export default reduxForm({ form: 'auth', validate })(
  connect(mapStateToProps)(AuthForm)
)
