import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteFromTrash,
  fetchTrash,
  restoreTodo,
} from "../../redux/feaures/queries";
import { toast } from "react-toastify";
import Spinner from "../loading/Spinner";

const Trash_component: React.FC = () => {
  const dispatch = useAppDispatch();
  const trash = useAppSelector((state) => state.todos.trash);
  const isLoading = useAppSelector((state) => state.todos.isLoading);

  useEffect(() => {
    dispatch(fetchTrash());
  }, [dispatch]);

  const handleRestore = (id: string) => {
    dispatch(restoreTodo(id)).then(() => {
      dispatch(fetchTrash());
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteFromTrash(id)).then(() => {
      toast.success("Todo Deleted");
      dispatch(fetchTrash());
    });
  };

  return (
    <div className="trash-container">
      {isLoading ? (
        <Spinner />
      ) : trash.length === 0 ? (
        <div className="empty_state">No items in trash</div>
      ) : (
        <div className="todos">
          {trash.map((todo) => (
            <div className="todo" key={todo.id}>
              <div className="todo-info">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>{todo.deadline}</p>
                <p
                  className={
                    todo.status === "Pending"
                      ? "status-pending"
                      : todo.status === "Completed"
                      ? "status-completed"
                      : "status-removed"
                  }
                >
                  Status: {todo.status}
                </p>
              </div>

              <div className="action_btns">
                <button
                  className="restore_btn"
                  onClick={() => handleRestore(todo.id)}
                >
                  Restore
                </button>
                <button
                  className="delete_btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash_component;
