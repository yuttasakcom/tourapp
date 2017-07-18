import React, { PureComponent } from 'react'

import dashboard from '../../resources/images/dashboard.png'

class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <img src={dashboard} alt="dashboard" />
      </div>
    )
  }
}

export default Dashboard
