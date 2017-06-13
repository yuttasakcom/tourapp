import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import imgBackground from '../../resources/img/city.jpg'
import * as actions from '../../actions'

class SignIn extends PureComponent {
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' }
    }

    if (this.props.authenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="signup-page">
        <Header />
        <div className="wrapper">
          <div className="header header-filter" style={styles.main}>
            <Body onSignIn={this.props.signIn} />
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated }
}

export default connect(mapStateToProps, actions)(SignIn)

const styles = {
  main: {
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  }
}
