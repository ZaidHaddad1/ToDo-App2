import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Task from "./Task";
import { tasksContext } from "../context/TaskContext";
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todo, setTodo } = useContext(tasksContext);
  const [tasksShow, setTaskShow] = useState("all");
  const [titleInput, setTitleInput] = useState("");

  // قراءة المهام عند بداية تحميل الصفحة
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodo(storedTodos);
  }, []);

  // حفظ تلقائي عند أي تغيير
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  // فلترة المهام
  const filteredTodos = todo.filter((t) => {
    if (tasksShow === "done") return t.isDone;
    if (tasksShow === "notDone") return !t.isDone;
    return true; // "all"
  });

  // إضافة مهمة جديدة
  function handleAddClick() {
    if (titleInput.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        title: titleInput,
        taskDetails: "",
        isDone: false,
      };
      setTodo([...todo, newTodo]);
      setTitleInput("");
    }
  }

  return (
    <Container
      maxWidth="xs"
      style={{
        backgroundColor: "#eee",
        marginTop: "150px",
        padding: "10px 20px",
        borderRadius: "6px",
        overflow: "auto",
        maxHeight: "70vh",
      }}
    >
      <h1 style={{ fontFamily: "A" }}>مهامي</h1>

      {/* أزرار التصنيفات */}
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setTaskShow("notDone")}
        >
          غير منجز
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setTaskShow("done")}
        >
          منجز
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setTaskShow("all")}
        >
          الكل
        </Button>
      </div>

      {/* عرض المهام */}
      {filteredTodos.map((t) => (
        <Task key={t.id} todo={t} />
      ))}

      {/* إضافة مهمة جديدة */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          variant="contained"
          color="error"
          style={{ width: "30%", marginRight: "5px" }}
          onClick={handleAddClick}
        >
          إضافة
        </Button>

        <TextField
          id="outlined-basic"
          label="عنوان المهمة"
          variant="outlined"
          color="error"
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput}
          style={{ flex: "1" }}
        />
      </div>
    </Container>
  );
}
