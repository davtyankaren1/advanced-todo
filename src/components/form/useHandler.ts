import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ITodo } from "../../types/types";
import { getTodo, updateTodo, postTodo } from "../../redux/feaures/queries";

const useHandler = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const todo = useAppSelector((state) => state.todos.singleTodo);

  const getDefaultDeadline = (): string => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 2);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    deadline: getDefaultDeadline(),
    status: "Pending" as "Pending" | "Completed" | "Overdue" | "Removed",
  });

  useEffect(() => {
    if (id) {
      dispatch(getTodo(id));
    } else {
      setInitialValues({
        title: "",
        description: "",
        deadline: getDefaultDeadline(),
        status: "Pending",
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (todo && id) {
      const deadline = new Date(todo.deadline);
      setInitialValues({
        title: todo.title,
        description: todo.description,
        deadline: new Date(
          deadline.getTime() - deadline.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16),
        status: todo.status,
      });
    }
  }, [todo, id]);

  const handleSubmit = async (values: typeof initialValues) => {
    if (id) {
      let updatedValues = { ...values };
      if (
        new Date(updatedValues.deadline).getTime() !==
        new Date(todo!.deadline).getTime()
      ) {
        updatedValues = { ...updatedValues, status: "Pending" };
      }
      await dispatch(updateTodo({ id, todo: { ...updatedValues, id } }));
      toast.success("Todo updated!");
    } else {
      const newTodo: ITodo = { id: generateUniqueId(), ...values };
      await dispatch(postTodo(newTodo));
      toast.success("Todo created!");
    }
    navigate("/todos");
  };

  const generateUniqueId = (): string => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  return {
    initialValues,
    handleSubmit,
    id,
  };
};

export default useHandler;
