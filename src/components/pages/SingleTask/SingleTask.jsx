import React, { PureComponent } from 'react';
import Spinner from '../../Spinner/Spinner'

export default class SingleTask extends PureComponent {
   constructor(props) {
      super(props)
      this.state = {
         task: null
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

   render() {
      let { task } = this.state;

      return (
         <>
            {!!task ?
               <div>
                  <h2>{task.title}</h2>
                  <p>Description: {task.description}</p>
                  <p>Date: {task.date.slice(0, 10)}</p>
                  <p>Created at: {task.created_at.slice(0, 10)}</p>
               </div> :
               <Spinner />
            }
         </>
      )
   }
}
