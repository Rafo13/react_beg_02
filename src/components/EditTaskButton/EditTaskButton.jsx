import React from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import styles from './EditTaskButton.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default class EditTaskButton extends React.Component {
   constructor(props) {
      super(props);
      const {date} = props.data
      this.state = {
         ...props.data,
         date: date ? new Date(date) : new Date()
      }
   };

   // hanleChange = (e) => {
   //    this.setState({
   //       title: e.target.value
   //    })
   // };

   handleSave = (e) => {
      const { title, date } = this.state;
      if (!title) {
         return;
      }
      const editedTask = {
         ...this.state,
         date: date.toISOString().slice(0, 10)
      }
      this.props.onSave(editedTask);
   };

   handleDate = (date) =>{
      this.setState({
         date,
      });
   }

   handleChange = (event) => {
      let {name} = event.target;

      this.setState({
         [name]: event.target.value //որպեսզի name-ը հասկանա, որպես փոփոխական
      });
   };

   render() {
      const { onClose } = this.props;
      const {title, description, date} = this.state;
      return (
         <>
            <Modal
               show={true}
               onHide={onClose}
               centered
            >
               <Modal.Header closeButton>
                  <Modal.Title>Edit Task</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <FormControl
                     value={title}
                     name="title"
                     onChange={this.handleChange}
                     onKeyDown={this.handleKeyDown}
                     placeholder="New Text"
                     className={styles.input}
                  />
                  <textarea
                     rows="4"
                     className={styles.description}
                     placeholder="Discription"
                     // onChange={(event)=>this.handleChange(event, 'description')}
                     name="description"
                     onChange={this.handleChange}
                     value={description}
                  >
                  </textarea>

                  <DatePicker
                     selected={date}
                     onChange={this.handleDate}
                     className={styles.date}
                     minDate={new Date()}
                  />

               </Modal.Body>
               <Modal.Footer>
                  <Button variant="primary" onClick={this.handleSave}>
                     Save
                  </Button>
                  <Button variant="secondary" onClick={onClose}>
                     Close
                  </Button>                 
               </Modal.Footer>
            </Modal>
         </>
      )
   }
}


EditTaskButton.propTypes = {
   data: PropTypes.object.isRequired,
   onSave: PropTypes.func.isRequired,
   onClose: PropTypes.func.isRequired
}