import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import Home from "./pages/home/Home";
import Todos from "./pages/todos/Todos";
import NotFound from "./pages/not-found/NotFound";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import AddEdit from "./pages/add-edit/AddEdit";
import Trash from "./pages/trash/Trash";
import { fetchTodos, fetchTrash } from "./redux/feaures/queries";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTrash());
  }, [dispatch]);

  useEffect(() => {
    navigate("/todos");
  }, []);

  return (
    <div>
      <ToastContainer autoClose={800} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/edit/:id" element={<AddEdit />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
