import React, { PureComponent } from 'react'

import Layout from '../../../components/layout'
import MenuList from './MenuList'
import Socket from './Socket'

class CompanyLayout extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <Layout logo="COMPANY APP" MenuList={MenuList}>
        <Socket />
        {children}
      </Layout>
    )
  }
}

export default CompanyLayout
