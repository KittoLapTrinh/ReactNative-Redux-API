import { ADD_TODO, DELETE_TODO, EDIT_TODO,FETCH_TODOS } from "./actionTypes";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: todoId,
});
  
export const editTodo = (todo) => ({
  type: EDIT_TODO,
  payload: todo,
});
  
export const fetchTodos = (todos) => ({
  type: FETCH_TODOS,
  payload: todos,
});

