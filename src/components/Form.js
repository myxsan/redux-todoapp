import React from "react";

function Form() {
  return (
    <form mv-action="set(newTodo, newTodo.trim()), if(newTodo != '', add(newTodo, todo) & set(newTodo, ''))">
      <input
        property="newTodo"
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
      />
    </form>
  );
}

export default Form;
