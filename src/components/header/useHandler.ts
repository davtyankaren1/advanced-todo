import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

const useHandler = () => {
  const [todosCount, setTodosCount] = useState(0);
  const [trashCount, setTrashCount] = useState(0);

  const todos = useAppSelector((state) => state.todos.todos);
  const trash = useAppSelector((state) => state.todos.trash);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const storedTrash = JSON.parse(localStorage.getItem("trash") || "[]");

    setTodosCount(storedTodos.length);
    setTrashCount(storedTrash.length);
  }, []);

  useEffect(() => {
    setTodosCount(todos.length);
    setTrashCount(trash.length);
  }, [todos, trash]);

  return {
    todosCount,
    trashCount,
  };
};

export default useHandler;
