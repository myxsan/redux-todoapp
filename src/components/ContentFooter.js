import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
  selectActiveFilter,
} from "../redux/todos/todosSlice";
import { removeCompletedItemsAsync } from "../redux/todos/services";

function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector(selectActiveFilter);

  const itemsLeft = items.filter((item) => !item.completed).length;
  const handleActiveFilterChange = (filter) => {
    dispatch(changeActiveFilter(filter));
  };

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => handleActiveFilterChange("all")}
            className={activeFilter === "all" ? "selected" : ""}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => handleActiveFilterChange("active")}
            className={activeFilter === "active" ? "selected" : ""}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => handleActiveFilterChange("completed")}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        onClick={async () => await dispatch(removeCompletedItemsAsync())}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
