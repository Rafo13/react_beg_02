
import * as actionTypes from './actionTypes';


const defaultState = {
   tasks: [],
   errorMessage: null, 
   successMessage: null, 
   loading: false,
   addTaskSuccess: false
 };
 
 const reducer = (state = defaultState, action)=>{
 switch(action.type){
 
   case actionTypes.LOADING: {
     return {
       ...state,
      loading: true,
      addTaskSuccess: false,
      errorMessage: null, 
      successMessage: null
     }
   }

   case actionTypes.GET_TASKS_SUCCESS: {
     return {
       ...state,
       tasks: action.tasks,
       loading :false
     }
   }

   case actionTypes.ADD_TASK_SUCCESS: {
     const tasks = [...state.tasks, action.tasks];
     return {
       ...state,
       tasks: tasks,
       loading :false, 
       successMessage: 'task added success!!!!', 
       addTaskSuccess: true
     }
   }

   case actionTypes.REMOVE_TASK_SUCCESS: {
    const newTasks = state.tasks.filter((task) => task._id !== action.taskId);

     return {
       ...state,
       tasks: newTasks,
       loading :false, 
       successMessage: 'task remove success!!!!', 
     }
   }
 
   case actionTypes.ERROR: {
       return {
         ...state,
         errorMessage: action.error,
         loading :false
       }
     }
 
   default: return state;
 }
 
 }

export {reducer};
