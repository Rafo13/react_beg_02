import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'


export default class Confirm extends Component {
   render() {
      return (
         <div>
            <Modal show={true} onHide={this.props.onClose}>
               <Modal.Header closeButton>
                  <Modal.Title>delete all {this.props.count} listed?</Modal.Title>
               </Modal.Header>
               <Modal.Footer>
                  <Button variant="danger" onClick={this.props.onSubmit}>
                     Remove
                  </Button>
                  <Button variant="secondary" onClick={this.props.onClose}>
                     Close
                  </Button>
               </Modal.Footer>
            </Modal>
         </div>
      )
   }
}


Confirm.propTypes = {
   count: PropTypes.number.isRequired,
   onSubmit: PropTypes.func.isRequired,
   onClose: PropTypes.func.isRequired,
}