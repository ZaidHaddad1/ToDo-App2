import "./App.css";
import TodoList from "./my-component/TodoList";
import { tasksContext } from "./context/TaskContext";
import { useState } from "react";

const Tasks = [];

function App() {
  const [todo, setTodo] = useState(Tasks);

  return (
    <div className="App">
      <tasksContext.Provider value={{ todo, setTodo }}>
        <TodoList />
      </tasksContext.Provider>
    </div>
  );
}

export default App;
