import React from "react";
import Spinner from "../../loading/Spinner";
import Todo from "../todo/Todo";
import useHandler from "./useHandler";

const TodoDashboard: React.FC = () => {
  const { todos, isLoading } = useHandler();

  return (
    <div className="todo-container">
      {isLoading ? (
        <Spinner />
      ) : todos.length === 0 ? (
        <div className="empty_state">No Todos</div>
      ) : (
        <div className="todos">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              deadline={todo.deadline}
              status={todo.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoDashboard;
