import React, { useState, useReducer, useCallback } from 'react';
import Button from '../../components/Button';
import './todo.css';

const newTodo = (todoName) => {
    return {
        id: Math.floor(Math.random() * 10 + 1),
        todoName: todoName,
        isComplete: false
    };
};

const todoReducer = (todos, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_TODO":
            return [...todos, newTodo(payload.name)];
        case "DELETE_TODO":
            return todos.filter(todo => todo.id !== payload.id);
        case "TOGGLE_TODO":
            return todos.map(todo => {
                if (todo.id === payload.id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            });
        case "EDIT_TODO":
            return todos.map(todo => {
                if (todo.id === payload.id) {
                    return { ...todo, todoName: payload.name };
                }
                return todo;
            });
        default:
            return todos;
    }
};

export default function Todo() {
    const [todoName, setTodoName] = useState("");
    const [editId, setEditId] = useState(null)
    const [todos, dispatch] = useReducer(todoReducer, []);

    const handleSubmit = useCallback((evt) => {
        evt?.preventDefault();
        if (editId !== null) {
            dispatch({ type: "EDIT_TODO", payload: { name: todoName, id: editId } });
        } else {
            dispatch({ type: "ADD_TODO", payload: { name: todoName } });
        }
        setTodoName("");
        setEditId(null);
    }, [todoName, editId]);

    const handleDelete = useCallback((id) => {
        dispatch({ type: "DELETE_TODO", payload: { id: id } });
    }, []);

    const handleToggle = useCallback((id) => {
        dispatch({ type: "TOGGLE_TODO", payload: { id: id } });
    }, []);

    const handleEdit = useCallback((id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setEditId(id);
        setTodoName(todoToEdit.todoName);
    }, [todos]);

    return (
        <div className='container'>
            <h2 className='heading'>Todo List</h2>
            <form onSubmit={(e) => handleSubmit(e)} className='form'>
                <input type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} className='input' />
                <Button text={editId ? "Edit" : "Add"} />
            </form>

            {todos.map(todo => (
                <div key={todo.id} className='listContiner'>
                    <span className={`list ${todo.isComplete && 'strike-through'}`} onClick={() => handleToggle(todo.id)}>
                        {todo.todoName}
                    </span>
                    <div className='btnContainer'>
                        <Button text={"Edit"} onClick={() => handleEdit(todo.id)} />
                        <Button text={"Delete"} onClick={() => handleDelete(todo.id)} customStyle={"bg-red"} />
                    </div>
                </div>
            ))}
        </div>
    )
}
