import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../actions'

class AcceptPending extends PureComponent {
  render() {
    const { show, toggleAcceptPendingGem } = this.props
    return (
      <Gem
        icon="arrow_downward"
        items={['test1', 'test2']}
        show={show}
        toggle={toggleAcceptPendingGem}
      />
    )
  }
}

const mapStateToProps = ({ notification }) => {
  return { show: notification.showAcceptPendingGem }
}

export default connect(mapStateToProps, actions)(AcceptPending)
