import React from "react";
import TodoForm from "./../TodoForm/index";
import TodoList from "./../TodoList/index";
import axios from "axios";
import { toast } from "react-toastify";
const Todos = () => {
  const [todos, setTodos] = React.useState([]);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [idUpdated, setIdUpdated] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  
  const handleUpdate = (id) => {
    setIdUpdated(id);
    setIsUpdate(true);
  };

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get(
          "https://express-mongodb-todos.herokuapp.com/api/v1/todos"
        );
        setTodos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodos();
  }, []);

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
      console.log(getResponse.data);
      const updateTodo = {
        title: getResponse.data.title,
        description: getResponse.data.description,
        completed: !getResponse.data.completed,
      };
      const newTodos = todos.map((todo) => {
        if (todo._id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(newTodos);
      const response = await axios.put(
        `https://express-mongodb-todos.herokuapp.com/api/v1/todos/${id}`,
        updateTodo
      );
      toast.success("Update successfully!!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  };

  return (
    <div>
      <TodoForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        todos={todos}
        setTodos={setTodos}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        setIdUpdated={idUpdated}
        idUpdated={idUpdated}
      />
      <TodoList
        deleteTodo={deleteTodo}
        todos={todos}
        handleCompleted={handleCompleted}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};
export default Todos;
