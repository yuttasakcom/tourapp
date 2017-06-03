import React from 'react'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import imgBackground from '../../resources/img/city.jpg'

export default () => (
  <div className="signup-page">
    <Header />
    <div className="wrapper">
      <div className="header header-filter" style={styles.main}>
        <Body />
        <Footer />
      </div>
    </div>
  </div>
)

const styles = {
  main: {
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  }
}
