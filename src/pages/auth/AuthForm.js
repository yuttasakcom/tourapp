import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import Card from '../../components/Card'
import Notification from '../../components/Notification'
import renderField from '../../components/renderField'

class AuthForm extends PureComponent {
  renderNotification() {
    const { show, type, message } = this.props.notification
    if (show) {
      return <Notification type={type} message={message} />
    }
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
    const {
      handleSubmit,
      title,
      description,
      authenticated,
      location
    } = this.props
    const { from } = location.state || { from: { pathname: '/dashboard' } }

    if (authenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <Card title={title} description={description}>
          {this.renderNotification()}
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

const mapStateToProps = ({ auth: { notification, authenticated } }) => {
  return { authenticated, notification }
}

export default reduxForm({ form: 'auth' })(connect(mapStateToProps)(AuthForm))
