import { createSlice } from "@reduxjs/toolkit";
import { ITodo, TodosState } from "../../types/types";
import * as query from "./queries";

const initialState: TodosState = {
  singleTodo: null,
  todos: [],
  trash: [],
  isLoading: false,
  isError: null,
};

const saveToLocalStorage = (key: string, value: ITodo[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    markAsOverdue: (state) => {
      const now = new Date();
      state.todos.forEach((todo) => {
        if (
          new Date(todo.deadline) < now &&
          todo.status !== "Completed" &&
          todo.status !== "Overdue"
        ) {
          todo.status = "Overdue";
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(query.fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        saveToLocalStorage("todos", action.payload);
        state.isLoading = false;
      })
      .addCase(query.fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.fetchTrash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.fetchTrash.fulfilled, (state, action) => {
        state.trash = action.payload;
        saveToLocalStorage("trash", action.payload);
        state.isLoading = false;
      })
      .addCase(query.fetchTrash.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.removeTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.removeTodo.fulfilled, (state, action) => {
        const removedTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );
        if (removedTodo) {
          removedTodo.status = "Removed";
          state.trash.push(removedTodo);
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
          saveToLocalStorage("todos", state.todos);
          saveToLocalStorage("trash", state.trash);
        }
        state.isLoading = false;
      })
      .addCase(query.removeTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.postTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.postTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        saveToLocalStorage("todos", state.todos);
        state.isLoading = false;
      })
      .addCase(query.postTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
          saveToLocalStorage("todos", state.todos);
        }
        state.isLoading = false;
      })
      .addCase(query.updateTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.restoreTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.restoreTodo.fulfilled, (state, action) => {
        const now = new Date();
        const restoredTodo = { ...action.payload };
        if (
          new Date(restoredTodo.deadline) < now &&
          restoredTodo.status !== "Completed"
        ) {
          restoredTodo.status = "Overdue";
        }
        state.trash = state.trash.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.todos.push(restoredTodo);
        saveToLocalStorage("todos", state.todos);
        saveToLocalStorage("trash", state.trash);
        state.isLoading = false;
      })
      .addCase(query.restoreTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.moveToTrash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.moveToTrash.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.trash.push(action.payload);
        saveToLocalStorage("todos", state.todos);
        saveToLocalStorage("trash", state.trash);
        state.isLoading = false;
      })
      .addCase(query.moveToTrash.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.markAsComplete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.markAsComplete.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
          saveToLocalStorage("todos", state.todos);
        }
        state.isLoading = false;
      })
      .addCase(query.markAsComplete.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.deleteFromTrash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.deleteFromTrash.fulfilled, (state, action) => {
        state.trash = state.trash.filter((todo) => todo.id !== action.payload);
        saveToLocalStorage("trash", state.trash);
        state.isLoading = false;
      })
      .addCase(query.deleteFromTrash.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      })
      .addCase(query.getTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(query.getTodo.fulfilled, (state, action) => {
        state.singleTodo = action.payload;
        state.isLoading = false;
      })
      .addCase(query.getTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Something went wrong";
      });
  },
});

export const { markAsOverdue } = todosSlice.actions;
export default todosSlice.reducer;
