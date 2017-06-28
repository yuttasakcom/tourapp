import React, { PureComponent } from 'react'

class renderField extends PureComponent {
  render() {
    const { input, label, type, meta: { touched, error, warning } } = this.props
    return (
      <div className="form-group label-floating">
        <label className="control-label">{label}</label>
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-control"
        />
        {touched && error && warning}
      </div>
    )
  }
}

export default renderField
