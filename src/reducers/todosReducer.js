import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const { newTitle } = action.payload;
      if (!newTitle.trim()) return currentTodos;

      const newTodo = {
        id: uuidv4(),
        title: newTitle,
        taskDetails: "",
        isDone: false,
      };

      return [...currentTodos, newTodo];
    }

    case "deleted": {
      return currentTodos.filter((t) => t.id !== action.payload.id);
    }

    case "toggled": {
      return currentTodos.map((t) =>
        t.id === action.payload.id ? { ...t, isDone: !t.isDone } : t
      );
    }

    case "edited": {
      return currentTodos.map((t) =>
        t.id === action.payload.id
          ? {
              ...t,
              title: action.payload.title,
              taskDetails: action.payload.details,
            }
          : t
      );
    }

    default:
      return currentTodos;
  }
}
