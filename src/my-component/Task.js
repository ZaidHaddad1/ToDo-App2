import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import "./icon.css";
import "./Task.css";
import { useContext, useState } from "react";
import { tasksContext } from "../context/TaskContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button, TextField } from "@mui/material";

export default function Task({ todo }) {
  const [open, setOpen] = useState(false); // للحذف
  const [edit, setEdit] = useState(false); // للتعديل
  const [editedValue, setEditedValue] = useState({
    title: todo.title,
    details: todo.taskDetails,
  }); // للتعديل على المهمة

  const { todo: todos, setTodo } = useContext(tasksContext);

  // تغيير حالة الإنجاز
  function handleCheckClick() {
    let updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isDone: !t.isDone } : t
    );
    setTodo(updatedTodos);
  }

  // حذف المهمة
  function handleDeleteClick() {
    let updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodo(updatedTodos);
  }

  // تعديل المهمة
  function handleEditClick() {
    let updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: editedValue.title, taskDetails: editedValue.details }
        : t
    );
    setTodo(updatedTodos);
  }

  return (
    <div
      className="text"
      style={{
        padding: "0px 5px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "#252F88",
        margin: "20px 0",
        transition: ".3s",
      }}
    >
      <div
        style={{
          display: "flex",
          direction: "rtl",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* زر التحقق */}
        <IconButton aria-label="check" onClick={handleCheckClick}>
          <CheckIcon
            className="myIcon"
            style={{
              color: todo.isDone ? "white" : "#8bc34a",
              padding: "3px",
              background: todo.isDone ? "#8bc34a" : "white",
              border: "1px solid #8bc34a",
              borderRadius: "50%",
              fontSize: "20px",
              transition: ".3s",
            }}
          />
        </IconButton>

        {/* زر التعديل */}
        <IconButton aria-label="edit" onClick={() => setEdit(true)}>
          <ModeEditOutlineOutlinedIcon
            className="myIcon"
            style={{
              color: "#1769aa",
              background: "white",
              border: "1px solid #1769aa",
              borderRadius: "50%",
              fontSize: "20px",
              transition: ".3s",
              padding: "3px",
            }}
          />
        </IconButton>

        {/* زر الحذف */}
        <IconButton aria-label="delete" onClick={() => setOpen(true)}>
          <DeleteOutlineIcon
            className="myIcon"
            style={{
              background: "white",
              border: "1px solid red",
              borderRadius: "50%",
              fontSize: "20px",
              transition: ".3s",
              padding: "3px",
            }}
            color="error"
          />
        </IconButton>
      </div>

      {/* نص المهمة */}
      <div
        style={{
          color: "white",
          flex: "1",
          marginLeft: "5px",
          textAlign: "right",
        }}
      >
        <h3 style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
          {todo.title}
        </h3>
        <h4>{todo.taskDetails}</h4>
      </div>

      {/* Dialog الحذف */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>هل أنت متأكد أنك تريد الحذف؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button
            onClick={() => {
              handleDeleteClick();
              setOpen(false);
            }}
            autoFocus
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog التعديل */}
      <Dialog open={edit} onClose={() => setEdit(false)}>
        <DialogContent style={{ direction: "rtl" }}>
          <DialogContentText>تعديل المهمة</DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            value={editedValue.title}
            label="عنوان المهمة"
            variant="standard"
            style={{ width: "300px" }}
            onChange={(e) =>
              setEditedValue({ ...editedValue, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            value={editedValue.details}
            label="التفاصيل"
            variant="standard"
            style={{ width: "300px" }}
            multiline
            onChange={(e) =>
              setEditedValue({ ...editedValue, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(false)}>إلغاء</Button>
          <Button
            onClick={() => {
              handleEditClick();
              setEdit(false);
            }}
            autoFocus
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
