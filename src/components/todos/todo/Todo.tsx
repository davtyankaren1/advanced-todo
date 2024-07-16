import React from "react";
import useHandler from "./useHandler";

interface TodoProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

const Todo: React.FC<TodoProps> = ({
  id,
  title,
  description,
  deadline,
  status,
}) => {
  const { timeLeft, handleEdit, handleDelete, handleComplete } = useHandler({
    id,
    title,
    description,
    deadline,
    status,
  });

  return (
    <div className="todo">
      <div className="todo-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Deadline: {new Date(deadline).toLocaleString()}</p>
        <p
          id="status_"
          className={
            status === "Pending"
              ? "status-pending"
              : status === "Completed"
              ? "status-completed"
              : status === "Overdue"
              ? "status-overdue"
              : ""
          }
        >
          Status: {status} {status === "Pending" && timeLeft && `(${timeLeft})`}
        </p>
      </div>

      <div className="action_btns">
        <button className="edit_btn" onClick={() => handleEdit(id)}>
          Edit
        </button>
        <button
          className="complete_btn"
          onClick={() => handleComplete(id)}
          disabled={status === "Overdue"}
        >
          Mark as Complete
        </button>
        <button className="delete_btn" onClick={() => handleDelete(id)}>
          Remove to trash
        </button>
      </div>
    </div>
  );
};

export default Todo;
