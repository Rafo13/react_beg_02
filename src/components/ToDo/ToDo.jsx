import React, { PureComponent } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';
import Confirm from '../Confirm';
import EditTaskButton from '../EditTaskButton/EditTaskButton';
import PropTypes from 'prop-types';




export default class ToDo extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         tasks: [],
         selectedTasks: new Set(),
         showConfirm: false,
         editTask: null,
         openNewTaskModal: false
      }
   };
   componentDidMount() {
      //backend-ից ստանում ենք task-երը
      fetch('http://localhost:3001/task', {
         method: 'GET',
         headers: {
            "Content-Type": "application/json"
         },
      })
         .then((res) => {
            return res.json()
         })
         .then((res) => {
            if (res.error) {
               throw res.error;//կոդի շարունակությունը չի աշխատում
            }
            this.setState({
               tasks: res
            })
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err)
         })
   }

   handleCheck = (taskId) => {
      const selectedTasks = new Set(this.state.selectedTasks)
      if (selectedTasks.has(taskId)) {
         selectedTasks.delete(taskId)
      }
      else {
         selectedTasks.add(taskId)
      }
      this.setState({
         selectedTasks
      })
   }


   handleClick = (data) => {
      const body = JSON.stringify(data)
      fetch('http://localhost:3001/task', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body
      })
         .then((res) => {
            return res.json()
         })
         .then((res) => {
            if (res.error) {
               throw res.error;
            }
            const tasks1 = [res, ...this.state.tasks]
            this.setState({
               tasks: tasks1,
               openNewTaskModal: false
            })
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err)
         })

      // const { inputValue } = this.state
      // const newTask = {
      //    text: value,
      //    _id: idGenerator()
      // }

      // const tasks1 = [newTask, ...this.state.tasks]// Պատճենում ենք զանգվածը, ամեն անգամ ավելացնելով նոր անդամ սկզբից (inputValue)
      // if (inputValue !== '') {
      // this.setState({
      //    tasks: tasks1,
      //    inputValue: ''
      // })
      // }  Կամ
   };



   removeTask = (taskId) => {
      fetch(`http://localhost:3001/task/${taskId}`, {
         method: 'DELETE',
         headers: {
            "Content-Type": "application/json"
         },
      })
         .then((res) => {
            return res.json()
         })
         .then((res) => {
            if (res.error) {
               throw res.error;
            }
            const newTasks = this.state.tasks.filter((task) => task._id !== taskId)
            this.setState({
               tasks: newTasks
            })
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err)
         })
   }

   removeSelected = () => {

      const body = {
         tasks: [...this.state.selectedTasks]
      }
      fetch(`http://localhost:3001/task`, {
         method: 'PATCH',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      })
         .then((res) => {
            return res.json()
         })
         .then((res) => {
            let tasks = [...this.state.tasks]
            this.state.selectedTasks.forEach((id) => {
               tasks = tasks.filter((task) => task._id !== id)
            });
            this.setState({
               tasks,
               selectedTasks: new Set(),
               showConfirm: false
            });
            if (res.error) {
               throw res.error;
            }
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err)
         })


   }

   toggleConfirm = () => {
      this.setState({
         showConfirm: !this.state.showConfirm
      });
   }

   toggleEdit = (task) => {
      this.setState({
         editTask: task
      });
   }

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
            }

            const tasks = [...this.state.tasks]
            const foundTaskIndex = tasks.findIndex((task) => {
               if (task._id === editedTask._id) {
                  return true;
               }
            });
            tasks[foundTaskIndex] = res1;
            this.setState({
               tasks: tasks,
               editTask: null
            });
         })
         .catch(err => {
            console.log("🚀 ~ file: ToDo.jsx ~ line 57 ~ ToDo ~ err", err)
         })
   }
   toggleNewTaskModal = ()=>{
      this.setState({
         openNewTaskModal: !this.state.openNewTaskModal
      })
   }

   render() {
      const { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;

      const tasks = this.state.tasks.map((task) => {
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
                        // disabled={selectedTasks.size === 0 ? true : false}  OR
                        // disabled={selectedTasks.size === 0}  OR
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
                  onSave={this.saveTask}
                  onClose={() => this.toggleEdit(null)}
               />
            }

            {openNewTaskModal &&
               <AddTask
                  onAdd={this.handleClick}
                  onClose={this.toggleNewTaskModal}
               />
            }
         </div>
      );
   }
}
// AddTask.propTypes= {
//    onClose: PropTypes.isRequired,
//    onAdd: PropTypes.isRequired
// }
