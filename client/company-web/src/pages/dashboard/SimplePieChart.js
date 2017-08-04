import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, Cell } from 'recharts'
import randomColor from 'randomcolor'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

class SimplePieChart extends PureComponent {
  render() {
    const { bookings } = this.props
    console.log(bookings)
    const data1 = bookings.map(booking => ({
      value: booking.status,
      name: booking.company
    }))
    return (
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data1}
          cx={300}
          cy={200}
          labelLine
          label
          outerRadius={150}
          fill="#8884d8"
        >
          {data1.map((entry, index) =>
            <Cell key={index} fill={randomColor()} />
          )}
        </Pie>
      </PieChart>
    )
  }
}

const mapStateToProps = ({ dashboard: { bookings } }) => ({ bookings })

export default connect(mapStateToProps)(SimplePieChart)
