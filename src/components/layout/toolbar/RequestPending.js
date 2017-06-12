import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../actions'

class RequestPending extends PureComponent {
  componentDidMount() {
    this.props.fetchRequestPendings()
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
        items={requestPendings}
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
