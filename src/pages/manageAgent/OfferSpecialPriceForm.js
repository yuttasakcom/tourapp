import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Modal } from 'react-bootstrap'

import RenderField from '../../components/RenderField'

class OfferSpecialPriceForm extends PureComponent {
  render() {
    const { handleSubmit, closeModal } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Field
                name="priceAdult"
                component={RenderField}
                label="Adult Price"
                type="text"
              />
            </div>
            <div className="col-md-6">
              <Field
                name="priceChild"
                component={RenderField}
                label="Child Price"
                type="text"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
          <Button bsStyle="primary" type="submit">Save</Button>
        </Modal.Footer>
      </form>
    )
  }
}

export default reduxForm({ form: 'offerSpecialPrice' })(OfferSpecialPriceForm)
