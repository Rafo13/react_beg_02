import React, { Component } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styles from './addtask.module.css';
import PropTypes from 'prop-types';


export default class AddTask extends Component {
   constructor(props) {
      super(props)
      this.state = {
         inputValue: '',
      }
   };

   handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         this.handleClick()
      }
   };

   handleChange = (e) => {
      this.setState({
         inputValue: e.target.value
      });
   };

   handleClick = () => {
      const { inputValue } = this.state
      if (!inputValue) {
         return;
      };

      const task = {
         title: inputValue
      };

      this.props.onAdd(task)
      this.setState({
         inputValue: ''
      });
   };

   // Տարբերակ 1
   // static propTypes = {
   //    disabled: PropTypes.bool,
   //    onAdd: PropTypes.func.isRequired
   // }; 

   render() {
      const { inputValue } = this.state;
      const { disabled } = this.props
      return (
         <div>
            <InputGroup className={styles.input} >
               <FormControl
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="New Task"
                  aria-label="New task"
                  aria-describedby="basic-addon2"
                  value={inputValue}
                  disabled={disabled}
               />
               <InputGroup.Append>
                  <Button
                     variant="outline-success"
                     onClick={() => this.handleClick()}
                     disabled={disabled}
                  >
                     Add Task
                               </Button>
               </InputGroup.Append>
            </InputGroup>
         </div>
      )
   }
}


  // Տարբերակ 2
  AddTask.propTypes = {
   disabled: PropTypes.bool,
   onAdd: PropTypes.func.isRequired
}; 

