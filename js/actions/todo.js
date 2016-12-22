import {dispatcher} from '../Dispatcher';

export const ActionTypes = {
  FETCH_TODOS: 'FETCH_TODOS',
  ADD_TODO: 'ADD_TODO',
  DELETE_COMPLETED_TODOS: 'DELETE_COMPLETED_TODOS',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  START_EDITING_TODO: 'START_EDITING_TODO',
  STOP_EDITING_TODO: 'STOP_EDITING_TODO',
  TOGGLE_ALL_TODOS: 'TOGGLE_ALL_TODOS',
  TOGGLE_TODO: 'TOGGLE_TODO',
  UPDATE_DRAFT: 'UPDATE_DRAFT',
};

export const ActionCreators = {
  fetchTodos() {
    dispatcher.dispatch({
      type: ActionTypes.FETCH_TODOS,
    });
  },

  addTodo(text) {
    dispatcher.dispatch({
      type: ActionTypes.ADD_TODO,
      text,
    });
  },

  deleteCompletedTodos() {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_COMPLETED_TODOS,
    });
  },

  deleteTodo(cid) {
    dispatcher.dispatch({
      type: ActionTypes.DELETE_TODO,
      cid,
    });
  },

  editTodo(cid, text) {
    dispatcher.dispatch({
      type: ActionTypes.EDIT_TODO,
      cid,
      text,
    });
  },

  toggleAllTodos() {
    dispatcher.dispatch({
      type: ActionTypes.TOGGLE_ALL_TODOS,
    });
  },

  toggleTodo(cid) {
    dispatcher.dispatch({
      type: ActionTypes.TOGGLE_TODO,
      cid,
    });
  },
};
