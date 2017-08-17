import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import sumBy from 'lodash/sumBy'

class Information extends PureComponent {
  render() {
    const { totalHotels, totalSeats } = this.props
    return (
      <div style={{ marginTop: 20 }} className="col-md-4 col-sm-4">
        <a style={{ marginRight: 10 }}>
          จำนวนโรงแรม <span className="badge">{totalHotels}</span>
        </a>
        <a>
          จำนวนผู้โดยสาร <span className="badge">{totalSeats}</span>
        </a>
      </div>
    )
  }
}

const mapStateToProps = ({ printBusPath: { touristHotelsSummary } }) => ({
  totalHotels: touristHotelsSummary.length,
  totalSeats: sumBy(touristHotelsSummary, 'total')
})

export default connect(mapStateToProps)(Information)
