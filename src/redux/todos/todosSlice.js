import { createSlice } from "@reduxjs/toolkit";
import {
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeItemAsync,
  removeCompletedItemsAsync,
} from "./services";
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => !item.completed);
      state.items = filtered;
    },
  },
  extraReducers(builder) {
    //get todos
    builder
      .addCase(getTodosAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    //add todos
    builder
      .addCase(addTodoAsync.pending, (state, action) => {
        state.addNewTodo.isLoading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addNewTodo.isLoading = false;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addNewTodo.isLoading = false;
        state.addNewTodo.error = action.error.message;
      });
    //toggle todo
    builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    });
    //remove todo
    builder.addCase(removeItemAsync.fulfilled, (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
    });
    builder.addCase(removeCompletedItemsAsync.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFiltered = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  const filtered = state.todos.items.filter((todo) => {
    return state.todos.activeFilter === "active"
      ? !todo.completed
      : todo.completed;
  });
  return filtered;
};
export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
