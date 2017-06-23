import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Gem from './Gem'
import * as actions from '../../../../actions'

class AcceptPending extends PureComponent {
  componentDidMount() {
    this.props.fetchAcceptPendings()
  }

  renderListItem = () => {
    const { acceptPendings } = this.props

    return _.map(acceptPendings, acceptPending =>
      <li key={acceptPending._id}>
        <a>{acceptPending.email}</a>
        <button className="btn btn-danger btn-sm" onClick={() => ''}>
          Delete
        </button>
      </li>
    )
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

const mapStateToProps = ({
  notification: { showAcceptPendingGem, acceptPendings }
}) => {
  return { showAcceptPendingGem, acceptPendings }
}

export default connect(mapStateToProps, actions)(AcceptPending)
