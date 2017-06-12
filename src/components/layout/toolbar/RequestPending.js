import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../actions'

class RequestPending extends PureComponent {
  render() {
    const { show, toggleRequestPendingGem } = this.props
    return (
      <Gem
        icon="arrow_upward"
        items={['test2']}
        show={show}
        toggle={toggleRequestPendingGem}
      />
    )
  }
}

const mapStateToProps = ({ notification }) => {
  return { show: notification.showRequestPendingGem }
}

export default connect(mapStateToProps, actions)(RequestPending)
