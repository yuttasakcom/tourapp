import map from 'lodash/map'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../../actions'

class RequestPending extends PureComponent {
  componentDidMount() {
    this.props.fetchRequestPendings()
  }

  renderListItem = () => {
    const { requestPendings, cancelRequestAgent } = this.props
    return map(requestPendings, requestPending =>
      <li key={requestPending._id} style={{ width: '200px' }}>
        <a>
          {requestPending.email}
        </a>
        <button
          className="btn btn-danger btn-sm pull-right"
          onClick={() => cancelRequestAgent(requestPending)}
        >
          Cancel
        </button>
      </li>
    )
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

const mapStateToProps = ({
  notification: { showRequestPendingGem, requestPendings }
}) => {
  return { showRequestPendingGem, requestPendings }
}

export default connect(mapStateToProps, actions)(RequestPending)
