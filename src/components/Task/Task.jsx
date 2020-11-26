import React, { PureComponent } from 'react';
import styles from './task.module.css'
import {Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


export default class Task extends PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         checked: false,
      }
   }

   handleCheck = () =>{
      this.setState({
         checked: !this.state.checked
      })

      this.props.onCheck(this.props.data._id) // task._id == this.props.data._id
   }

   render() {
      const task = this.props.data;
      const {checked} = this.state;
      const {disabled} = this.props;
      return (
         <>
            <Card className={`${styles.task} ${checked ? styles.select: ''}`} style={{color: 'cyan'}}>
               <Card.Body>
                  <input type="checkbox"
                  onClick={this.handleCheck}
                  /> 
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>
                     {task.description}
                  </Card.Text>
                  <Button
                  variant="warning"
                  className={styles.warnButton}
                  disabled={disabled}
                  onClick={()=>this.props.onEdit(task)}
                  >
                  <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger"
                  className={styles.dangerButton}
                  onClick={() => this.props.onRemove(task._id)}
                  disabled={disabled}
                  >
                  <FontAwesomeIcon icon={faTrash} />
                  </Button>
               </Card.Body>
            </Card>
         </>
      )
   }
};


Task.propTypes = {
   data: PropTypes.object.isRequired,
   onRemove: PropTypes.func.isRequired,
   onCheck: PropTypes.func.isRequired,
   disabled: PropTypes.bool.isRequired
};
