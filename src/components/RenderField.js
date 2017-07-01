import React, { PureComponent } from 'react'

class renderField extends PureComponent {
  render() {
    const { input, label, type, meta: { touched, error, warning } } = this.props
    return (
      <div
        className={`form-group label-floating ${touched &&
          error &&
          'has-error'}`}
      >
        <label className="control-label">
          {label}
        </label>
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-control"
        />
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
