import React from "react";
import TodoItem from "../TodoItem";
const TodoList = ({todos, deleteTodo, handleCompleted, handleUpdate}) => {
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

export default TodoList;
