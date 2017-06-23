import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../../actions'

class RequestPending extends PureComponent {
  componentDidMount() {
    this.props.fetchRequestPendings()
  }

  renderListItem = () => {
    return this.props.requestPendings.map((requestPending, index) =>
      <li key={index}>
        <a>{requestPending}</a>
        <button className="btn btn-danger btn-sm pull-right" onClick={() => ''}>
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
        length={requestPendings.length}
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
