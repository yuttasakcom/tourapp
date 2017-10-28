import map from 'lodash/map'
import React from 'react'

import Gem from './Gem'

class RequestPending extends React.PureComponent {
  renderListItem = () => {
    const { requestPendings, cancelRequest } = this.props
    return map(requestPendings, requestPending => (
      <li key={requestPending._id} style={{ width: '200px' }}>
        <a>{requestPending.email}</a>
        <button
          className="btn btn-danger btn-sm pull-right"
          onClick={() => cancelRequest(requestPending._id)}
        >
          Cancel
        </button>
      </li>
    ))
  }

  render() {
    const {
      showRequestPendingGem,
      toggleRequestPendingGem,
      requestPendings
    } = this.props
    return (
      <Gem
        icon="arrow_upward"
        length={Object.keys(requestPendings).length}
        renderListItem={this.renderListItem}
        show={showRequestPendingGem}
        toggle={toggleRequestPendingGem}
      />
    )
  }
}

export default RequestPending
