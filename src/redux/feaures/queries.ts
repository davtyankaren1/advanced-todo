import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import * as actionTypes from "../actionTypes";
import * as api from "../api";
import { ITodo } from "../../types/types";

export const fetchTodos: AsyncThunk<ITodo[], void, {}> = createAsyncThunk(
  actionTypes.FETCH_TODOS,
  async () => {
    return await api.getTodos();
  }
);

export const fetchTrash: AsyncThunk<ITodo[], void, {}> = createAsyncThunk(
  actionTypes.FETCH_TRASH,
  async () => {
    return await api.getTrash();
  }
);

export const removeTodo: AsyncThunk<string, string, {}> = createAsyncThunk(
  actionTypes.REMOVE_TODO,
  async (id: string) => {
    const todo = await api.getTodoById(id);
    await api.deleteTodoById(id);
    await api.postToTrash({ ...todo, status: "Removed" });
    return id;
  }
);

export const postTodo: AsyncThunk<ITodo, ITodo, {}> = createAsyncThunk(
  actionTypes.POST_TODO,
  async (todo: ITodo) => {
    return await api.postTodo(todo);
  }
);

export const updateTodo: AsyncThunk<ITodo, { id: string; todo: ITodo }, {}> =
  createAsyncThunk(
    actionTypes.UPDATE_TODO,
    async ({ id, todo }: { id: string; todo: ITodo }) => {
      return await api.updateTodoById(id, todo);
    }
  );

export const restoreTodo: AsyncThunk<ITodo, string, {}> = createAsyncThunk(
  actionTypes.RESTORE_TODO,
  async (id: string) => {
    const todo = await api.getTrashTodoById(id);
    await api.deleteFromTrashById(id);
    const newDeadline = new Date(todo.deadline);
    newDeadline.setHours(newDeadline.getHours() + 1);
    const restoredTodo = await api.postTodo({
      ...todo,
      deadline: newDeadline.toISOString(),
      status: "Pending",
    });
    return restoredTodo;
  }
);

export const moveToTrash: AsyncThunk<ITodo, string, {}> = createAsyncThunk(
  actionTypes.MOVE_TO_TRASH,
  async (id: string) => {
    const todo = await api.getTodoById(id);
    await api.deleteTodoById(id);
    await api.postToTrash({ ...todo, status: "Removed" });
    return todo;
  }
);

export const markAsComplete: AsyncThunk<ITodo, string, {}> = createAsyncThunk(
  actionTypes.MARK_AS_COMPLETED,
  async (id: string) => {
    const todo = await api.getTodoById(id);
    const updatedTodo = await api.updateTodoById(String(id), {
      ...todo,
      status: "Completed",
    });
    return updatedTodo;
  }
);

export const deleteFromTrash: AsyncThunk<string, string, {}> = createAsyncThunk(
  actionTypes.DELETE_FROM_TRASH,
  async (id: string) => {
    await api.deleteFromTrashById(id);
    return id;
  }
);

export const getTodo: AsyncThunk<ITodo, string, {}> = createAsyncThunk(
  actionTypes.GET_TODO,
  async (id: string) => {
    return await api.getTodoById(id);
  }
);
