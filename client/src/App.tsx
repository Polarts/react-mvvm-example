import React from 'react';
import './App.css';
import TodoService from './services/TodoService';
import TodoList from './components/TodoList';
import TodoListViewModel from './viewmodels/TodoListViewModel';

function App() {
  let todoViewModel = new TodoListViewModel(TodoService.instance);
  return <TodoList viewModel={todoViewModel}/>
}

export default App;
