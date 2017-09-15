import map from 'lodash/map'
import React from 'react'

import Gem from './Gem'

class AcceptPending extends React.PureComponent {
  renderListItem = () => {
    const {
      acceptPendings,
      accept,
      rejectRequest,
      openViewProfileModal
    } = this.props

    return map(acceptPendings, acceptPending => (
      <li key={acceptPending._id} style={{ width: '200px' }}>
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => openViewProfileModal(acceptPending._id)}
        >
          {acceptPending.email}
        </a>
        <button
          className="btn btn-danger btn-sm pull-right"
          onClick={() => rejectRequest(acceptPending._id)}
        >
          Reject
        </button>
        <button
          className="btn btn-info btn-sm pull-right"
          onClick={() => accept(acceptPending._id)}
        >
          Accept
        </button>
      </li>
    ))
  }

  render() {
    const {
      showAcceptPendingGem,
      toggleAcceptPendingGem,
      acceptPendings
    } = this.props
    return (
      <Gem
        icon="arrow_downward"
        length={Object.keys(acceptPendings).length}
        renderListItem={this.renderListItem}
        show={showAcceptPendingGem}
        toggle={toggleAcceptPendingGem}
      />
    )
  }
}

export default AcceptPending
