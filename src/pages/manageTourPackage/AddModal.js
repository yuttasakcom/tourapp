import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

class AddModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tour Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-5">
                <div className="form-group label-floating">
                  <label className="control-label">Company (disabled)</label>
                  <input type="text" className="form-control" disabled />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group label-floating">
                  <label className="control-label">Username</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group label-floating">
                  <label className="control-label">Email address</label>
                  <input type="email" className="form-control" />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button bsStyle="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddModal
