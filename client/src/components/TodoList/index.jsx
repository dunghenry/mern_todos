import React from "react";
import TodoItem from "../TodoItem";
import axios from 'axios';
import { toast } from "react-toastify";
const TodoList = ({ todos, handleUpdate, setTodos}) => {
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `https://express-mongodb-todos.herokuapp.com/api/v1/todos/${id}`
      );
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
      toast.success(response.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  };

  const handleCompleted = async (id) => {
    try {
      const getResponse = await axios.get(
        `https://express-mongodb-todos.herokuapp.com/api/v1/todos/${id}`
      );
      const updateTodo = {
        title: getResponse.data.title,
        description: getResponse.data.description,
        completed: !getResponse.data.completed,
      };
      const response = await axios.put(
        `https://express-mongodb-todos.herokuapp.com/api/v1/todos/${id}`,
        updateTodo
      );
      // console.log(response.data)
      toast.success("Update successfully!!");
      const newTodos = todos.map((todo) => {
        if (todo._id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(newTodos);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  };
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          id={todo._id}
          key={todo._id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          deleteTodo={deleteTodo}
          handleCompleted={handleCompleted}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);
