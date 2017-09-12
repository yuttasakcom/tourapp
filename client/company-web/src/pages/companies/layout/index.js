import React, { PureComponent } from 'react'

import Layout from '../../../components/layout'

class CompanyLayout extends PureComponent {
  render() {
    const { children } = this.props
    return <Layout logo="COMPANY APP">{children}</Layout>
  }
}

export default CompanyLayout
