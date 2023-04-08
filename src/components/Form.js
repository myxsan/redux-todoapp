import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "../redux/todos/todosSlice";

function Form() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ id: nanoid(), title, completed: false }));
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        property="newTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
    </form>
  );
}

export default Form;
