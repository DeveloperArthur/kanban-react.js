import React, { useState } from "react";
import './index.css';
import {v4 as uuidv4 } from 'uuid'
import NavBar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskLisk/TaskList";

const generateId = () => {
  return uuidv4();
}

function App() {
  const [tasks, setTasks] = useState([]);

  const addTaskApp = (title, state) => {
    console.log('funcao sendo chamada aqui em App');
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      console.log(existingTasks)
      console.log(newTask)
      return [...existingTasks, newTask];   
    })
  };

  const updateTask = (id, title, state) => {
    console.log('chamando sim update task')
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if(task.id === id){
          return {...task, title, state};
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter(task => task.id !== id);
    })
  }

  return (
    <div className="App">
      <NavBar/>
      <div className="container">
        <TaskList 
          title="To Do" 
          onAddTask={addTaskApp} 
          tasks={tasks.filter((t) => t.state === "To Do")} 
          onTaskUpdate={updateTask}
          taskState="To Do"
          onDeleteTask={deleteTask}
        />
        <TaskList 
          title="Doing"
          onAddTask={addTaskApp} 
          tasks={tasks.filter((t) => t.state === "Doing")} 
          onTaskUpdate={updateTask}
          taskState="Doing"
          onDeleteTask={deleteTask}
        />
        <TaskList 
          title="Done"
          onAddTask={addTaskApp} 
          tasks={tasks.filter((t) => t.state === "Done")} 
          onTaskUpdate={updateTask}
          taskState="Done"
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
