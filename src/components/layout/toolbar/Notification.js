import React, { Component } from 'react'

import Gem from './Gem'

class Notification extends Component {
  render() {
    const items = [
      'Mike John responded to your email',
      'You have 5 new tasks',
      'Youre now friend with Andrew',
      'Another Notification',
      'Another One'
    ]
    return <Gem icon="notifications" items={items} />
  }
}

export default Notification
