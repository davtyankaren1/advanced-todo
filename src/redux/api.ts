import axios from "axios";
import { ITodo } from "../types/types";
import { TODOS_URL, TRASH_URL } from "./urls";

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await axios.get<ITodo[]>(TODOS_URL);
  return response.data;
};

export const getTrash = async (): Promise<ITodo[]> => {
  const response = await axios.get<ITodo[]>(TRASH_URL);
  return response.data;
};

export const getTodoById = async (id: string): Promise<ITodo> => {
  const response = await axios.get<ITodo>(`${TODOS_URL}/${id}`);
  return response.data;
};

export const deleteTodoById = async (id: string): Promise<void> => {
  await axios.delete(`${TODOS_URL}/${id}`);
};

export const postTodo = async (todo: ITodo): Promise<ITodo> => {
  const response = await axios.post<ITodo>(TODOS_URL, todo);
  return response.data;
};

export const updateTodoById = async (
  id: string,
  todo: ITodo
): Promise<ITodo> => {
  const response = await axios.put<ITodo>(`${TODOS_URL}/${id}`, todo);
  return response.data;
};

export const postToTrash = async (todo: ITodo): Promise<void> => {
  await axios.post(TRASH_URL, todo);
};

export const deleteFromTrashById = async (id: string): Promise<void> => {
  await axios.delete(`${TRASH_URL}/${id}`);
};

export const getTrashTodoById = async (id: string): Promise<ITodo> => {
  const response = await axios.get<ITodo>(`${TRASH_URL}/${id}`);
  return response.data;
};
