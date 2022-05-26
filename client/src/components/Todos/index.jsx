import React from "react";
import TodoForm from "./../TodoForm/index";
import TodoList from "./../TodoList/index";
import axios from "axios";
const Todos = () => {
  const [todos, setTodos] = React.useState([]);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [idUpdated, setIdUpdated] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
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

  const getTodo = async (id) => {
    const response = await axios.get(
      `https://express-mongodb-todos.herokuapp.com/api/v1/todos/${id}`
    );
    setDescription(response.data.description);
    setTitle(response.data.title);
  }
  const handleUpdate = async(id) => {
    setIdUpdated(id);
    setIsUpdate(true);
    await getTodo(id);
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
      {
        todos.length > 0 ? <TodoList
          todos={todos}
          setTodos={setTodos}
          handleUpdate={handleUpdate}
        /> : <p>Loading...</p>
      }
    </div>
  );
};
export default Todos;
