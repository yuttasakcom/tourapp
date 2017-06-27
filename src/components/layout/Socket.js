import { PureComponent } from 'react'
import { connect } from 'react-redux'

import socket from '../../actions/socket'
import * as actions from '../../actions'

class Socket extends PureComponent {
  componentDidMount() {
    socket.on('request', () => {
      this.props.fetchAcceptPendings()
    })

    socket.on('accept', () => {
      this.props.fetchRequestPendings()
      this.props.fetchCompanies()
    })

    socket.on('cancelRequest', () => {
      this.props.fetchAcceptPendings()
    })

    socket.on('rejectRequest', () => {
      this.props.fetchRequestPendings()
    })

    socket.on('deleteRelationship', () => {
      this.props.fetchCompanies()
    })
  }

  render() {
    return null
  }
}

export default connect(null, actions)(Socket)
