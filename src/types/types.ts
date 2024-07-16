export interface ITodo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "Pending" | "Completed" | "Overdue" | "Removed";
}

export interface TodosState {
  todos: ITodo[];
  isLoading: boolean;
  isError: string | null;
  trash: ITodo[];
  singleTodo: ITodo | null;
}
