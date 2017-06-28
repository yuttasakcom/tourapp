import React, { PureComponent } from 'react'
import DatePicker from './DatePicker'

class renderField extends PureComponent {
  renderInput() {
    const { input, label, type } = this.props
    switch (type) {
      case 'date':
        return <DatePicker date={input.value} onDateChange={input.onChange} />

      default:
        return (
          <input
            {...input}
            placeholder={label}
            type={type}
            className="form-control"
          />
        )
    }
  }

  render() {
    const { label, meta: { touched, error, warning } } = this.props
    return (
      <div className="form-group label-floating">
        <label className="control-label">{label}</label>
        {this.renderInput()}
        {touched && error && warning}
      </div>
    )
  }
}

export default renderField
