import { PureComponent } from 'react'
import { connect } from 'react-redux'

import socket from '../../../state/utils/socket'
import actions from '../../../state/ducks/actions'

class Socket extends PureComponent {
  componentDidMount() {
    socket.on('request', () => {
      this.props.fetchAcceptPendings()
    })

    socket.on('accept', () => {
      this.props.fetchRequestPendings()
      this.props.fetchAgents()
    })

    socket.on('cancelRequest', () => {
      this.props.fetchAcceptPendings()
    })

    socket.on('rejectRequest', () => {
      this.props.fetchRequestPendings()
    })

    socket.on('deleteRelationship', () => {
      this.props.fetchAgents()
    })

    socket.on('book', booking => {
      this.props.fetchBookings()
      this.props.addNotification(booking)
    })
  }

  render() {
    return null
  }
}

export default connect(null, {
  ...actions.company.agent,
  ...actions.company.notification,
  ...actions.company.booking
})(Socket)
