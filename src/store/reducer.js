import * as actionTypes from './actionTypes';


const defaultState = {
  tasks: [],
  task: null,
  errorMessage: null,
  successMessage: null,
  loading: false,
  addTaskSuccess: false,
  removeTaskSuccess: false,
  editTaskSuccess: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true,
        addTaskSuccess: false,
        errorMessage: null,
        successMessage: null,
        removeTaskSuccess: false,
        editTaskSuccess: false
      }
    }

    case actionTypes.GET_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.tasks,
        loading: false
      }
    }

    case actionTypes.ADD_TASK_SUCCESS: {
      const tasks = [...state.tasks, action.tasks];
      return {
        ...state,
        tasks: tasks,
        loading: false,
        successMessage: 'task added success!!!!',
        addTaskSuccess: true
      }
    }

    case actionTypes.REMOVE_TASK_SUCCESS: {
      const newTasks = state.tasks.filter((task) => task._id !== action.taskId);
      return {
        ...state,
        tasks: newTasks,
        loading: false,
        successMessage: 'task remove success!!!!',
      }
    }

    case actionTypes.REMOVE_SELECTED_TASKS_SUCCESS: {
      let tasks = [...state.tasks];

      action.taskIds.forEach((id) => {
        tasks = tasks.filter((task) => task._id !== id);
      });

      return {
        ...state,
        tasks: tasks,
        loading: false,
        successMessage: 'tasks remove success!!!!',
        removeTaskSuccess: true

      }
    }

    case actionTypes.EDIT_TASK_SUCCESS: {
     
      if (action.from === 'single') {
        
        return {
          ...state,
          task: action.task,
          loading: false,
          successMessage: 'task edited success!!!!',
          editTaskSuccess: true

        }
      } else {
        const tasks = [...state.tasks];
        const foundTaskIndex = tasks.findIndex((task) => {
          if (task._id === action.task._id) {
            return true;
          };
          return false;
        });
        tasks[foundTaskIndex] = action.task;

        return {
          ...state,
          tasks: tasks,
          loading: false,
          successMessage: 'task edited success!!!!',
          editTaskSuccess: true

        }
      }
    }

    case actionTypes.GET_SINGLE_TASK_SUCCESS: {

      return {
        ...state,
        task: action.task,
        loading: false
      }
    }

    case actionTypes.ERROR: {
      return {
        ...state,
        errorMessage: action.error,
        loading: false
      }
    }

    default:
      return state;
  }

}

export {
  reducer
};