import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/services";

function Form() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);

  if (error) {
    alert(error);
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") return;
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        property="newTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      {isLoading && <span style={{ paddingRight: 10 }}>Loading..</span>}
    </form>
  );
}

export default Form;
