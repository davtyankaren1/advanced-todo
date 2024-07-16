import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchTodos } from "../../../redux/feaures/queries";
import { markAsOverdue } from "../../../redux/feaures/todosSlice";

const useHandler = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const isLoading = useAppSelector((state) => state.todos.isLoading);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(markAsOverdue());
  }, [dispatch]);

  return {
    todos,
    isLoading,
  };
};

export default useHandler;
