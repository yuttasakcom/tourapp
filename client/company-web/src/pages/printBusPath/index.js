import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import sumBy from 'lodash/sumBy'

import FilterDate from './FilterDate'
import BusPathList from './BusPathList'
import Card from '../../components/Card'

class PrintBusPath extends PureComponent {
  render() {
    const { totalHotels, totalSeats } = this.props

    return (
      <div className="container-fluid">
        <Card title="Bus Path" style={{ height: '800px' }}>
          <div className="row">
            <div className="col-md-4 col-sm-4">
              <FilterDate />
            </div>
            <div style={{ marginTop: 20 }} className="col-md-4 col-sm-4">
              <a style={{ marginRight: 10 }}>
                จำนวนโรงแรม <span className="badge">{totalHotels}</span>
              </a>
              <a>
                จำนวนผู้โดยสาร <span className="badge">{totalSeats}</span>
              </a>
            </div>
            <div className="col-md-4 col-sm-4">
              <button className="btn btn-primary pull-right" onClick={() => ''}>
                Print
              </button>
              <button className="btn btn-success pull-right" onClick={() => ''}>
                Update
              </button>
            </div>
          </div>
          <BusPathList />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ printBusPath: { hotels } }) => ({
  totalHotels: hotels.length,
  totalSeats: sumBy(hotels, 'total')
})

export default connect(mapStateToProps)(PrintBusPath)
