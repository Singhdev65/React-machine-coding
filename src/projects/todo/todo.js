import React, { useState, useReducer, useCallback } from "react";
import Button from "../../components/Button";
import "./todo.css";
import actionTypes from "../../utils/actionTypes";

const newTodo = (todoName) => {
  return {
    id: Date.now(),
    todoName: todoName,
    isComplete: false,
  };
};

const todoReducer = (todos, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TODO:
      return [...todos, newTodo(payload.name)];
    case actionTypes.DELETE_TODO:
      return todos.filter((todo) => todo.id !== payload.id);
    case actionTypes.TOGGLE_TODO:
      return todos.map((todo) =>
        todo.id === payload.id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    case actionTypes.EDIT_TODO:
      return todos.map((todo) =>
        todo.id === payload.id ? { ...todo, todoName: payload.name } : todo
      );
    default:
      return todos;
  }
};

export default function Todo() {
  const [todoName, setTodoName] = useState("");
  const [editId, setEditId] = useState(null);
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useState("all"); // all, completed, remaining

  const handleSubmit = useCallback(
    (evt) => {
      evt?.preventDefault();
      if (!todoName.trim()) return;

      if (editId !== null) {
        dispatch({
          type: "EDIT_TODO",
          payload: { name: todoName, id: editId },
        });
      } else {
        dispatch({ type: "ADD_TODO", payload: { name: todoName } });
      }

      setTodoName("");
      setEditId(null);
    },
    [todoName, editId]
  );

  const handleDelete = useCallback((id) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  }, []);

  const handleEdit = useCallback(
    (id) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      setEditId(id);
      setTodoName(todoToEdit.todoName);
    },
    [todos]
  );

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isComplete;
    if (filter === "remaining") return !todo.isComplete;
    return true;
  });

  return (
    <div className="container">
      <h2 className="heading">Todo List</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="input"
          placeholder="Enter todo..."
        />
        <Button text={editId ? "Edit" : "Add"} />
      </form>

      <div className="filter-buttons">
        <Button text="All" onClick={() => setFilter("all")} />
        <Button text="Completed" onClick={() => setFilter("completed")} />
        <Button text="Remaining" onClick={() => setFilter("remaining")} />
      </div>

      {filteredTodos.length === 0 && <p className="empty">No todos to show.</p>}

      {filteredTodos.map((todo) => (
        <div key={todo.id} className="listContainer">
          <span className={`list ${todo.isComplete ? "strike-through" : ""}`}>
            {todo.todoName}
          </span>
          <div className="btnContainer">
            <Button
              text={todo.isComplete ? "Undo" : "Mark Complete"}
              onClick={() => handleToggle(todo.id)}
              customStyle={todo.isComplete ? "btn-undo" : "btn-complete"}
            />
            <Button text={"Edit"} onClick={() => handleEdit(todo.id)} />
            <Button
              text={"Delete"}
              onClick={() => handleDelete(todo.id)}
              customStyle={"bg-red"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
