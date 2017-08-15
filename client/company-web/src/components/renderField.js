import React, { PureComponent } from 'react'
import Select from 'react-select'

import DatePicker from './DatePicker'

class renderField extends PureComponent {
  renderInput() {
    const { input, label, type, meta, ...rest } = this.props
    switch (type) {
      case 'select':
        return (
          <Select
            {...rest}
            {...input}
            onBlur={() => input.onBlur(input.value.value)}
          />
        )

      case 'date':
        return <DatePicker date={input.value} onDateChange={input.onChange} />

      default:
        return (
          <input
            {...rest}
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
      <div
        className={`form-group label-floating ${touched &&
          error &&
          'has-error'}`}
      >
        <label className="control-label">
          {label}
        </label>
        {this.renderInput()}
        {touched &&
          ((error &&
            <span style={{ color: 'red' }}>
              {error}
            </span>) ||
            (warning &&
              <span>
                {warning}
              </span>))}
      </div>
    )
  }
}

export default renderField
