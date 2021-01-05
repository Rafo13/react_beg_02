import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskButton from '../../EditTaskButton/EditTaskButton';
import { connect } from 'react-redux';
import { getSingleTask, removeTask } from '../../../store/actions'


class SingleTask extends PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         task: null,
         openEditModal: false
      }
   }
   componentDidMount() {
      const taskId = this.props.match.params.id;
      this.props.getSingleTask(taskId);
   }

   componentDidUpdate(prevProps){
      if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
         this.setState({
            openEditModal: false
         });
      }
      // if (!prevProps.removeTask1Success && this.props.removeTask1Success) {
      //    this.props.history.push('/')
      // }
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

  
   render() {
      let { openEditModal } = this.state;
      const { task } = this.props;
      const historyPush = this.props.history.push;
      return (
         <>
            {!!task ?
               <div>
                  <h2>{task.title}</h2>
                  <p>Description: {task.description}</p>
                  <p>Date: {task.date.slice(0, 10)}</p>
                  <p>Created at: {task.created_at.slice(0, 10)}</p>
                  <Button variant="danger"
                     onClick={()=>this.props.removeTask(task._id, 'single', historyPush)}
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
               <h3>Not Task found</h3>
            }

            {
               openEditModal &&
               <EditTaskButton
                  data={task}
                  from='single'
                  onSave={this.saveTask}
                  onClose={this.toggleEdit}
               />
            }
         </>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      task: state.task,
      editTaskSuccess: state.editTaskSuccess,
      // removeTask1Success: state.removeTask1Success
   }
}

const mapDispatchToProps = {
   getSingleTask,
   removeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)