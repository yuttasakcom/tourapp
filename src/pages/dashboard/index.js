import React, { PureComponent } from 'react'
import { Button, Modal } from 'react-bootstrap'

import Layout from '../../components/layout'

class Dashboard extends PureComponent {
  state = { showModal: false }

  close = () => {
    this.setState({ showModal: false })
  }

  open = () => {
    this.setState({ showModal: true })
  }

  render() {
    return (
      <Layout title="Dashboard">
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Body</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    )
  }
}

export default Dashboard
