import { PureComponent } from 'react'
import { connect } from 'react-redux'

import socket from '../../actions/socket'
import * as actions from '../../actions'

class Socket extends PureComponent {
  componentDidMount() {}

  render() {
    return null
  }
}

export default connect(null, actions)(Socket)