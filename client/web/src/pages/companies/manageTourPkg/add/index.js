import React from 'react'

import AddModal from './AddModal'

class Add extends React.PureComponent {
  state = {
    showModal: false
  }

  render() {
    console.log(this.state.showModal)
    return (
      <div>
        <button
          className="btn btn-primary pull-right"
          onClick={() => this.setState({ showModal: true })}
        >
          Add
        </button>
        <AddModal
          closeModal={() => this.setState({ showModal: false })}
          showModal={this.state.showModal}
        />
      </div>
    )
  }
}

export default Add
