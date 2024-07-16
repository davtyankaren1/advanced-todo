import { NavLink } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import useHandler from "./useHandler";

const Header = () => {
  const { todosCount, trashCount } = useHandler();

  return (
    <div className="header">
      <div className="form-control">
        <NavLink
          to="/todos"
          className={({ isActive }) => (isActive ? "active" : "non-active")}
        >
          Todos <LuListTodo size={25} />
          <div className="count">{todosCount}</div>
        </NavLink>
      </div>
      <div className="form-control">
        <NavLink
          to="/trash"
          className={({ isActive }) => (isActive ? "active" : "non-active")}
        >
          Trash <BsTrash size={25} />
          <div className="count">{trashCount}</div>
        </NavLink>
      </div>
      <NavLink
        to="/add"
        className={({ isActive }) => (isActive ? "active" : "non-active")}
      >
        Add Todo <IoAddCircleOutline size={25} />
      </NavLink>
    </div>
  );
};

export default Header;
