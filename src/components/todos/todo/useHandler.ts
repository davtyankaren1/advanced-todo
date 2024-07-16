import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux/hooks";
import {
  markAsComplete,
  moveToTrash,
  updateTodo,
} from "../../../redux/feaures/queries";

interface TodoHandlerProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

const useHandler = ({
  id,
  title,
  description,
  deadline,
  status,
}: TodoHandlerProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const timeDiff = deadlineDate.getTime() - now.getTime();

      if (timeDiff <= 0 && status !== "Overdue" && status !== "Completed") {
        setTimeLeft("Overdue");
        dispatch(
          updateTodo({
            id,
            todo: { id, title, description, deadline, status: "Overdue" },
          })
        );
        toast.error(`Task "${title}" is overdue.`);
      } else if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, dispatch, id, status, title]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(moveToTrash(id));
    toast.success("Todo moved to trash");
  };

  const handleComplete = (id: string) => {
    dispatch(markAsComplete(id));
  };

  return {
    timeLeft,
    handleEdit,
    handleDelete,
    handleComplete,
  };
};

export default useHandler;
