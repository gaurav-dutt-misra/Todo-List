import './App.css';
import Header from './MyComponents/Header';
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import {AddTodo} from './MyComponents/AddTodo';
import {About} from './MyComponents/About'

import React, { useState,useEffect } from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) =>{
    console.log("i am on delete",todo);
    setTodos(todos.filter((e)=>{
    return e!==todo;}
    ));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo=(title,desc) =>{
    console.log("adding",title,desc);
    let sno;
    if(todos.length===0)
    {sno=0;}
    else{sno= todos[todos.length-1].sno +1;}
    const myTodo={
      sno : sno,
      title : title,
      desc : desc
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <>
    <Router>
    <Header title="My Todo List" searchBar={false}/>
    <Switch>
      <Route exact path="/" render={()=> {
        return(
        <>
        <AddTodo addTodo={addTodo}/>
        <Todos todos={todos} onDelete={onDelete}/>
        </>)
      }}>
      </Route>
      <Route exact path="/about">
      <About />
      </Route>
    </Switch>
    
    <Footer />
    </Router>
    </>
  );
}

export default App;
