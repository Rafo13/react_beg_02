import React, { PureComponent } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';
import Confirm from '../Confirm';
import EditTaskButton from '../EditTaskButton/EditTaskButton';



export default class ToDo extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         tasks: [],
         selectedTasks: new Set(),
         showConfirm: false,
         editTask: null
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
               tasks: tasks1
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
      const newTasks = this.state.tasks.filter((task) => task._id !== taskId)
      this.setState({
         tasks: newTasks
      })
   }

   removeSelected = () => {
      let tasks = [...this.state.tasks]
      this.state.selectedTasks.forEach((id) => {
         tasks = tasks.filter((task) => task._id !== id)
      });
      this.setState({
         tasks,
         selectedTasks: new Set(),
         showConfirm: false
      });
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
      const tasks = [...this.state.tasks]
      const foundTaskIndex = tasks.findIndex((task) => {
         if (task._id === editedTask._id) {
            return true;
         }
      });
      tasks[foundTaskIndex] = editedTask;
      this.setState({
         tasks: tasks,
         editTask: null
      });
   }

   render() {
      const { selectedTasks, showConfirm, editTask } = this.state;
      
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
               <Row className="justify-content-center">
                  <Col md={6} xs={12} sm={10} lg={6}>
                     <AddTask
                        onAdd={this.handleClick}
                        disabled={!!selectedTasks.size}
                     />
                  </Col>
               </Row>
               <Row>
                  {tasks}
               </Row>

               <Row className="justify-content-center">
                  <Col xs={4}>
                     <Button
                        variant="outline-success"
                        onClick={this.toggleConfirm}
                        // disabled={selectedTasks.size === 0 ? true : false}  OR
                        // disabled={selectedTasks.size === 0}  OR
                        disabled={!selectedTasks.size}
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
         </div>
      );
   }
}

