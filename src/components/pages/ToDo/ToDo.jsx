import React, { PureComponent } from 'react';
import Task from '../../Task/Task';
import AddTask from '../../AddTask/AddTask';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';
import Confirm from '../../Confirm';
import EditTaskButton from '../../EditTaskButton/EditTaskButton';
import { connect } from 'react-redux';
import { getTasks, removeSelected } from '../../../store/actions.js';


class ToDo extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         selectedTasks: new Set(),
         showConfirm: false,
         editTask: null,
         openNewTaskModal: false
      }
   };

   componentDidMount() {
      this.props.getTasks()
   };

   componentDidUpdate(prevProps) {
      if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
         this.toggleNewTaskModal();
      }

      if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
         this.setState({
            selectedTasks: new Set(),
            showConfirm: false
         });
      }

      if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
         this.setState({
            editTask: null
         });
      }

   }

   handleCheck = (taskId) => {
      const selectedTasks = new Set(this.state.selectedTasks);
      if (selectedTasks.has(taskId)) {
         selectedTasks.delete(taskId)
      }
      else {
         selectedTasks.add(taskId)
      };
      this.setState({
         selectedTasks
      });
   };

   handleClick = (data) => {
      const body = JSON.stringify(data);
      fetch('http://localhost:3001/task', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body
      })
         .then((res) => {
            return res.json();
         })
         .then((res) => {
            if (res.error) {
               throw res.error;
            }
            const tasks1 = [...this.state.tasks, res];
            this.setState({
               tasks: tasks1,
               openNewTaskModal: false
            });
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err);
         });
   };

   // removeTask -y grecinq redux-i mijocov


   removeSelected = () => {
      const taskIds = [...this.state.selectedTasks];
      this.props.removeSelected(taskIds);
   }

   toggleConfirm = () => {
      this.setState({
         showConfirm: !this.state.showConfirm
      });
   };

   toggleEdit = (task) => {
      this.setState({
         editTask: task
      });
   };


   toggleNewTaskModal = () => {
      this.setState({
         openNewTaskModal: !this.state.openNewTaskModal
      });
   };

   render() {
      const { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;

      const tasks = this.props.tasks.map((task) => {
         return (
            <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2} className={styles.taskCol}>
               <Task
                  data={task}
                  onRemove={this.removeTask}
                  onCheck={this.handleCheck}
                  disabled={!!selectedTasks.size}
                  onEdit={this.toggleEdit}
               />
            </Col>
         )
      });

      return (
         <div className={styles.wrap}>
            <Container>
               <Row className="justify-content-center text-center">
                  <Col md={6} xs={12} sm={10} lg={6}>
                     <Button
                        variant="outline-success"
                        onClick={this.toggleNewTaskModal}
                        disabled={!!selectedTasks.size}
                        className={styles.addButton}
                     >
                        Add Task
                     </Button>
                  </Col>
               </Row>
               <Row>
                  {tasks}
               </Row>

               <Row className="justify-content-center">
                  <Col xs={4}
                     className={styles.removeColButton}
                  >
                     <Button
                        variant="outline-success"
                        onClick={this.toggleConfirm}
                        disabled={!selectedTasks.size}
                        className={styles.removeButton}
                     >
                        Remove
                     </Button>
                  </Col>
               </Row>
            </Container>
            {
               (showConfirm === true) ?
                  <Confirm
                     onSubmit={this.removeSelected}
                     onClose={this.toggleConfirm}
                     count={selectedTasks.size}
                  />
                  : null
            }

            {
               !!editTask &&
               <EditTaskButton
                  data={editTask}
                  from='tasks'
                  onClose={() => this.toggleEdit(null)}
               />
            }

            {openNewTaskModal &&
               <AddTask
                  onClose={this.toggleNewTaskModal}
               />
            }
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      tasks: state.tasks,
      addTaskSuccess: state.addTaskSuccess,
      removeTaskSuccess: state.removeTaskSuccess,
      editTaskSuccess: state.editTaskSuccess
   };
}


//sa ashxatum e thunk-i shnorhiv
const mapDispatchToProps = {
   getTasks: getTasks,
   removeSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);