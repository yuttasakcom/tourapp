import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../../actions'

class AcceptPending extends PureComponent {
  componentDidMount() {
    this.props.fetchAcceptPendings()
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
        items={acceptPendings}
        show={showAcceptPendingGem}
        toggle={toggleAcceptPendingGem}
      />
    )
  }
}

const mapStateToProps = ({
  notification: { showAcceptPendingGem, acceptPendings }
}) => {
  return { showAcceptPendingGem, acceptPendings }
}

export default connect(mapStateToProps, actions)(AcceptPending)
