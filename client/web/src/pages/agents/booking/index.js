import React, { PureComponent } from 'react'

import Card from '../../../components/Card'
import PkgDataTable from './PkgDataTable'

class Booking extends PureComponent {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <Card title="Packages" description="Select package for book">
            <div className="row">
              <div className="col-md-12">
                <PkgDataTable />
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Booking
