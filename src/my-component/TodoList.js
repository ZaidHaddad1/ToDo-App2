import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Task from "./Task";
import { tasksContext } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";
import { useState, useContext } from "react";

export default function TodoList() {
  const { todos, dispatch } = useContext(tasksContext);
  const { showHideToast } = useToast();

  const [tasksShow, setTaskShow] = useState("all");
  const [titleInput, setTitleInput] = useState("");

  // فلترة المهام
  const filteredTodos = todos.filter((t) => {
    if (tasksShow === "done") return t.isDone;
    if (tasksShow === "notDone") return !t.isDone;
    return true;
  });

  // إضافة مهمة جديدة
  function handleAddClick() {
    if (!titleInput.trim()) {
      showHideToast("الرجاء إدخال عنوان المهمة");
      return;
    }

    dispatch({ type: "added", payload: { newTitle: titleInput } });
    setTitleInput("");
    showHideToast("تمت الإضافة بنجاح ✅");
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
