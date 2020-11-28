import React, { Component } from 'react'
import {FormControl, Button, Modal } from 'react-bootstrap';
import styles from './addtask.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class AddTask extends Component {
   constructor(props) {
      super(props)
      this.state = {
         title: '',
         description: '',
         date: new Date()
      }
   };

   handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         this.handleClick();
      }
   };

   // version 1
   // handleChange = (event, name) => {
   //    console.log(name)
   //    this.setState({
   //       [name]: event.target.value //որպեսզի name-ը հասկանա, որպես փոփոխական
   //    });
   // };

   // version 2
   handleChange = (event) => {
      let {name} = event.target;

      this.setState({
         [name]: event.target.value //որպեսզի name-ը հասկանա, որպես փոփոխական
      });
   };

   handleClick = () => {
      const { description, title, date } = this.state;
      if (!title) {
         return;
      };

      const task = {
         title: title,
         description: description, 
         date: date.toISOString().slice(0, 10)
      };
      this.props.onAdd(task);
   };

   handleDate = (date) =>{
      this.setState({
         date,
      });
   }

   // Տարբերակ 1
   // static propTypes = {
   //    disabled: PropTypes.bool,
   //    onAdd: PropTypes.func.isRequired
   // }; 

   render() {
      const { onClose } = this.props;
      return (
         <>
            <Modal
               show={true}
               onHide={onClose}
               centered
            >
               <Modal.Header closeButton>
                  <Modal.Title>Add Task</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <FormControl
                     // onChange={this.handleChange}
                     // onChange={(event)=>this.handleChange(event, 'title')}
                     name="title"
                     onChange={this.handleChange}
                     onKeyDown={this.handleKeyDown}
                     placeholder="New Text"
                     className={styles.input}
                  />
                  <textarea
                  rows="4"
                  className={styles.description}
                  placeholder = "Discription"
                  // onChange={(event)=>this.handleChange(event, 'description')}
                  name="description"
                  onChange={this.handleChange}
                  >                           
                  </textarea>

               <DatePicker
               selected={this.state.date}
               onChange={this.handleDate}
               className={styles.date}
               minDate={new Date()}
               />

               </Modal.Body>
               <Modal.Footer>
                  <Button variant="primary" onClick={this.handleClick}>
                     Add
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


// Տարբերակ 2
AddTask.propTypes = {
   disabled: PropTypes.bool,
   onAdd: PropTypes.func.isRequired
};

