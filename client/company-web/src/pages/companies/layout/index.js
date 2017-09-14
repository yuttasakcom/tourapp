import React from 'react'
import { connect } from 'react-redux'

import Layout from '../../../components/layout'
import MenuList from './MenuList'
import Socket from './Socket'
import * as actions from '../../../actions/companies'

class CompanyLayout extends React.PureComponent {
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
      rejectRequestAgent,
      cancelRequestAgent,
      openViewAgentProfileModal,
      selectedProfile
    } = this.props
    return (
      <Layout
        logo="COMPANY APP"
        MenuList={MenuList}
        acceptPendings={acceptPendings}
        notifications={notifications}
        requestPendings={requestPendings}
        accept={this.handleAcceptAgent}
        rejectRequest={rejectRequestAgent}
        cancelRequest={cancelRequestAgent}
        selectedProfile={selectedProfile}
        openViewProfileModal={openViewAgentProfileModal}
      >
        <Socket />
        {children}
      </Layout>
    )
  }
}

const mapStateToProps = ({
  company: {
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

export default connect(mapStateToProps, actions)(CompanyLayout)
