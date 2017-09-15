import React from 'react'
import { connect } from 'react-redux'

import Layout from '../../../components/layout'
import MenuList from './MenuList'
import Socket from './Socket'
import * as actions from '../../../actions/agents'

class AgentLayout extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAcceptPendings()
    this.props.fetchNotifications()
    this.props.fetchRequestPendings()
  }

  handleAcceptAgent = acceptPendingId => {
    const { acceptAgent, fetchAgents } = this.props
    acceptAgent(acceptPendingId, fetchAgents)
  }

  render() {
    const {
      children,
      acceptPendings,
      notifications,
      requestPendings,
      rejectRequestCompany,
      cancelRequestCompany,
      openViewCompanyProfileModal,
      selectedProfile
    } = this.props
    return (
      <Layout
        logo="AGENT APP"
        title="Agent App"
        MenuList={MenuList}
        acceptPendings={acceptPendings}
        notifications={notifications}
        requestPendings={requestPendings}
        accept={this.handleAcceptAgent}
        rejectRequest={rejectRequestCompany}
        cancelRequest={cancelRequestCompany}
        selectedProfile={selectedProfile}
        openViewProfileModal={openViewCompanyProfileModal}
      >
        <Socket />
        {children}
      </Layout>
    )
  }
}

const mapStateToProps = ({
  agent: {
    notification: {
      acceptPendings,
      notifications,
      requestPendings,
      selectedAcceptPending
    }
  }
}) => ({
  acceptPendings,
  notifications,
  requestPendings,
  selectedProfile: acceptPendings[selectedAcceptPending]
})

export default connect(mapStateToProps, actions)(AgentLayout)
