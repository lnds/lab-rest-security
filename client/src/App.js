import React, { Fragment } from "react"
import './App.css';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Login from "./components/Login";
import Logout from "./components/Logout";
import useToken from './useToken';

function App() {
  return (
    <Fragment >
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment >
  );
}

export default App;
