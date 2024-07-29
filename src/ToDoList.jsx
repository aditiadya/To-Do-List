import { useState } from "react";
import {v4 as uuidv4} from "uuid";

export default function ToDoList() {
    let divStyle = {
        backgroundColor: "#D6EFD8", 
        borderRadius: "20px",
        minHeight: "300px",
        maxHeight: "fit-content",
        width: "800px",
        color: "#1A5319",
        padding: "50px 0",
    }
    let inputStyle = {
        backgroundColor: "#D6EFD8",
        height: "40px",
        width: "500px",
        borderRadius: "15px",
        marginRight: "15px",
        color: "#1A5319",
    }
    let taskStyle = {
        backgroundColor: "white",
        height: "50px",
        width: "590px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "10px",
        marginTop: "5px",
        display: " flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
    let buttonStyle = {
        height: "30px", 
        display: "flex",
        alignItems: "center",
        marginRight: "20px"
    }

    let [todos, setTodos] = useState([{task: "Eat", id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, {task: newTodo, id: uuidv4(), isDone: false}];
        });
        setNewTodo("");
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
    }

    let markAsDone = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if(todo.id == id){
                    return {
                        ...todo,
                        isDone: true,
                    };
                }
                else{
                    return todo;
                }
            })
        ))
    };

    let markAsDoneAll = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                return {
                    ...todo,
                    isDone: true,
                };
            })
        ))
    };

    return (
        <div style={divStyle}>
            <h1>To Do List</h1>
            <div style={{display: "flex", justifyContent: "center"}}>
                <input type="text" placeholder="Enter a Task..." style={inputStyle} value={newTodo} onChange={updateTodoValue}/>
                <button onClick={addNewTask}>Add</button>
            </div>
            <br />
            <div>
                    {
                        todos.map((todo) => {
                            return (
                                <div key={todo.id} style={taskStyle}>
                                    <ul>
                                        <li style={todo.isDone ? {textDecorationLine: "line-through"} : {}}>{todo.task}</li>
                                    </ul>
                                    <div style={{display: "flex"}}>
                                        <button style={buttonStyle} onClick={() => markAsDone(todo.id)}>Mark as Done</button>
                                        <button style={buttonStyle} onClick={ () => deleteTodo(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                    <br />
                    <button onClick={markAsDoneAll}>Mark All As Done</button>
            </div>
        </div>
    );
}