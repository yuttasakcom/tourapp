import React, { Component } from 'react'

import Gem from './Gem'

class AcceptPending extends Component {
  render() {
    return <Gem icon="arrow_downward" items={['test1', 'test2']} />
  }
}

export default AcceptPending
