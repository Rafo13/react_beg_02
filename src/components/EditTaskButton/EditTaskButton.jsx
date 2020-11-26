import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import styles from './EditTaskButton.module.css'



export default class EditTaskButton extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         ...props.data
      }
   }

   hanleChange = (e) => {
      this.setState({
         text: e.target.value
      })
   }

   handleSave = (e) => {
      const {text} = this.state;
      if(!text){
         return;
      }
      this.props.onSave(this.state)
   }
   render() {
      const { text } = this.state
      const { props } = this
      return (
         <div>
            <Modal show={true} onHide={props.onClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Edit Task...</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  <input type="text"
                     className={styles.inp}
                     value={text}
                     onChange={this.hanleChange}
                  />
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={props.onClose}>
                     Close
                  </Button>
                  <Button variant="primary" onClick={this.handleSave}>
                     Save
                  </Button>
               </Modal.Footer>
            </Modal>
         </div>
      )
   }
}


EditTaskButton.propTypes = {
   data: PropTypes.object.isRequired,
   onSave: PropTypes.func.isRequired,
   onClose: PropTypes.func.isRequired
}