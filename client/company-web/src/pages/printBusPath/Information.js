import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import sumBy from 'lodash/sumBy'
import intersectionBy from 'lodash/fp/intersectionBy'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import flatten from 'lodash/fp/flatten'

class Information extends PureComponent {
  render() {
    const {
      totalHotels,
      totalSeats,
      selectedHotels,
      selectedSeats
    } = this.props
    return (
      <div>
        <div className="row">
          <a style={{ marginRight: 10 }}>
            โรงแรม: ทั้งหมด <span className="badge">{totalHotels}</span>
          </a>
          <a>
            คงเหลือ{' '}
            <span className="badge">{totalHotels - selectedHotels}</span>
          </a>
        </div>
        <div className="row">
          <a style={{ marginRight: 10 }}>
            ผู้โดยสาร: ทั้งหมด <span className="badge">{totalSeats}</span>
          </a>
          <a>
            คงเหลือ <span className="badge">{totalSeats - selectedSeats}</span>
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  printBusPath: { bookingsHotelsSummary, hotelsSelects }
}) => {
  const selectedHotels = flow(
    map('values'),
    flatten,
    map(value => {
      value._id = value.value
      return value
    }),
    intersectionBy('_id', bookingsHotelsSummary)
  )(hotelsSelects)
  return {
    totalHotels: bookingsHotelsSummary.length,
    totalSeats: sumBy(bookingsHotelsSummary, 'total'),
    selectedHotels: selectedHotels.length,
    selectedSeats: sumBy(selectedHotels, 'total')
  }
}

export default connect(mapStateToProps)(Information)
