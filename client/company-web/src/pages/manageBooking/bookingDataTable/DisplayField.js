import React, { PureComponent } from 'react'

class DisplayField extends PureComponent {
  render() {
    const { label, text } = this.props
    return (
      <div className="row">
        <div className="col-md-5">
          <label className="pull-right">{label}: </label>
        </div>
        <div className="col-md-7">
          {text}
        </div>
      </div>
    )
  }
}

export default DisplayField
