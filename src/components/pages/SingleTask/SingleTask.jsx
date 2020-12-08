import React, { PureComponent } from 'react';
import Spinner from '../../Spinner/Spinner';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskButton from '../../EditTaskButton/EditTaskButton';


export default class SingleTask extends PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         task: null,
         openEditModal: false
      }
   }
   componentDidMount() {
      const taskId = this.props.match.params.id

      fetch(`http://localhost:3001/task/${taskId}`, {
         method: 'GET',
         headers: {
            "Content-Type": "application/json"
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((res) => {
            if (res.error) {
               throw res.error;
            }
            this.setState({
               task: res
            });
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err)
         });
   }

   onRemove = () => {
      const taskId = this.state.task._id;
      fetch(`http://localhost:3001/task/${taskId}`, {
         method: 'DELETE',
         headers: {
            "Content-Type": "application/json"
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((res) => {
            if (res.error) {
               throw res.error;
            };
            this.props.history.push('/')//Ջնջելուց հետո տանում է գլխավոր էջ
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err);
         });
   };

   toggleEdit = () => {
      this.setState({
         openEditModal: !this.state.openEditModal
      });
   };

   saveTask = (editedTask) => {
      fetch(`http://localhost:3001/task/${editedTask._id}`, {
         method: 'PUT',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(editedTask)
      })
         .then((res) => {
            return res.json()
         })
         .then((res1) => {
            if (res1.error) {
               throw res1.error;
            };
            this.setState({
               task: res1,
               openEditModal: false
            });
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err);
         });
   };

   render() {
      let { task, openEditModal } = this.state;

      return (
         <>
            {!!task ?
               <div>
                  <h2>{task.title}</h2>
                  <p>Description: {task.description}</p>
                  <p>Date: {task.date.slice(0, 10)}</p>
                  <p>Created at: {task.created_at.slice(0, 10)}</p>
                  <Button variant="danger"
                     onClick={this.onRemove}
                  >
                     <FontAwesomeIcon icon={faTrash} />
                  </Button>

                  <Button
                     variant="warning"
                     onClick={this.toggleEdit}
                  >
                     <FontAwesomeIcon icon={faEdit} />
                  </Button>
               </div> :
               <Spinner />
            }

            {
               openEditModal &&
               <EditTaskButton
                  data={task}
                  onSave={this.saveTask}
                  onClose={this.toggleEdit}
               />
            }
         </>
      )
   }
}
