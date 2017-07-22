import React, { PureComponent } from 'react'

class NoMatch extends PureComponent {
  render() {
    return (
      <div>
        <h3>
          Sorry, No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    )
  }
}

export default NoMatch
