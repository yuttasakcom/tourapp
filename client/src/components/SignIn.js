import React from 'react'

const styles = {
  loginWrapper: {
    margin: '-0.75rem',
    overflowY: 'hidden',
  },
  heroBanner: {
    background: 'url(\'https://unsplash.it/2000/1000\')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundBlendMode: 'screen',
  },
  heroTitle: {
    display: 'inline-block',
    padding: '5px',
  },
  heroBodyContainer: {
    backgroundColor: 'transparent',
  },
}

export default () => (
  <div style={styles.loginWrapper} className="columns">
    <div className="column is-8 is-hidden-mobile">
      <section style={styles.heroBanner} className="hero is-fullheight is-dark">
        <div className="hero-body">
          <div style={styles.heroBodyContainer} className="container section">
            <div className="has-text-right">
              <h1 className="title is-1">Login</h1>
              <p className="title is-3">Secure User Account Login</p>
            </div>
          </div>
        </div>
        <div className="hero-footer">
          <p className="has-text-centered">Image Glenn Carstens-Peters via unsplash</p>
        </div>
      </section>
    </div>
  </div>
)
