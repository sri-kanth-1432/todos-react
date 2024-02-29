import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './index.css'

const TodoApp = () => {
    const [userInputValue, setUserInputValue] = useState('');
    const [todoList, setTodoList] = useState(() => {
        const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
        return storedTodoList || [];
    });

    const handleAddTodo = () => {
        if (userInputValue.trim() === "") {
            alert("Enter Valid Text");
            return;
        }
        const newTodo = {
            text: userInputValue,
            uniqueNo: todoList.length + 1,
            isChecked: false,
        };
        setTodoList([...todoList, newTodo]);
        setUserInputValue('');
    };

    const handleTodoStatusChange = (todoId) => {
        const updatedTodoList = todoList.map(todo => {
            if (todo.uniqueNo === todoId) {
                return { ...todo, isChecked: !todo.isChecked };
            }
            return todo;
        });
        setTodoList(updatedTodoList);
    };

    const handleDeleteTodo = (todoId) => {
        const updatedTodoList = todoList.filter(todo => todo.uniqueNo !== todoId);
        setTodoList(updatedTodoList);
    };

    const handleSaveTodo = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const handleClearTodo = () => {
        localStorage.removeItem("todoList");
        setTodoList([]);
    };

    return (
        <div className="app-container">
            <div className="todo-container">
                <h1 className="todo-heading">Todos</h1>
                <p className="todo-create-title">Create<span className="todo-create-sub-title">Task</span></p>
                <input type="text" placeholder="What needs to be done?" value={userInputValue} onChange={(e) => setUserInputValue(e.target.value)} className="input-element" />
                <button className="button" onClick={handleAddTodo}>Add</button>
                <p className="todo-create-title">My<span className="todo-create-sub-title">Tasks</span></p>
                <ul className="my-tasks">
                    {todoList.map(todo => (
                        <li key={todo.uniqueNo} className="my-tasks-card">
                            <input type="checkbox" className="checkbox-input" checked={todo.isChecked} onChange={() => handleTodoStatusChange(todo.uniqueNo)} />
                            <div className="my-tasks-container">
                                <label htmlFor={`checkbox${todo.uniqueNo}`} className={`label-element ${todo.isChecked ? 'checked' : ''}`}>{todo.text}</label>
                                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteTodo(todo.uniqueNo)} />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="button-card">
                    <button className="button" onClick={handleSaveTodo}>Save</button>
                    <button className="button clear-button" onClick={handleClearTodo}>Clear</button>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;



