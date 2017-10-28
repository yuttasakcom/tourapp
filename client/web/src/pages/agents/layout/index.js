import React from 'react'
import { connect } from 'react-redux'

import Layout from '../../../components/layout'
import MenuList from './MenuList'
import Socket from './Socket'

import actions from '../../../state/ducks/actions'

class AgentLayout extends React.PureComponent {
  componentDidMount() {
    const { authenticated, user } = this.props.auth
    if (authenticated && user.role === 'agent') {
      this.props.fetchAcceptPendings()
      this.props.fetchNotifications()
      this.props.fetchRequestPendings()
    }
  }

  render() {
    const {
      children,
      acceptPendings,
      notifications,
      requestPendings,
      acceptCompany,
      rejectRequestCompany,
      cancelRequestCompany,
      selectAcceptPending,
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
        accept={acceptCompany}
        rejectRequest={rejectRequestCompany}
        cancelRequest={cancelRequestCompany}
        selectedProfile={selectedProfile}
        selectAcceptPending={selectAcceptPending}
      >
        <Socket />
        {children}
      </Layout>
    )
  }
}

const mapStateToProps = ({
  auth,
  agent: {
    notification: {
      acceptPendings,
      notifications,
      requestPendings,
      selectedAcceptPending
    }
  }
}) => ({
  auth,
  acceptPendings,
  notifications,
  requestPendings,
  selectedProfile: acceptPendings[selectedAcceptPending]
})

export default connect(mapStateToProps, actions.agent.notification)(AgentLayout)
