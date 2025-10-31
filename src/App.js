import "./App.css";
import TodoList from "./my-component/TodoList";
import { tasksContext } from "./context/TaskContext";
import { useReducer, useEffect } from "react";
import { ToastProvider } from "./context/ToastContext";
import todosReducer from "./reducers/todosReducer";

function App() {
  const [todos, dispatch] = useReducer(todosReducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ تلقائي في localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <ToastProvider>
        <tasksContext.Provider value={{ todos, dispatch }}>
          <TodoList />
        </tasksContext.Provider>
      </ToastProvider>
    </div>
  );
}

export default App;
