import React, { PureComponent } from 'react'

class Searchbar extends PureComponent {
  render() {
    return (
      <form className="navbar-form navbar-right" role="search">
        <div className="form-group is-empty">
          <input type="text" className="form-control" placeholder="Search" />
          <span className="material-input" />
        </div>
        <button type="submit" className="btn btn-white btn-round btn-just-icon">
          <i className="material-icons">search</i>
          <div className="ripple-container" />
        </button>
      </form>
    )
  }
}

export default Searchbar
