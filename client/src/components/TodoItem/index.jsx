import React from "react";
const TodoItem = ({ id, title, description, completed, deleteTodo, handleCompleted, handleUpdate}) => {
 
  return (
    <div className={`todo-item ${completed ? 'active' : ''}`}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <input type="checkbox" checked={completed} onChange={() => handleCompleted(id)} />
        <button className="btn-primary" onClick={() => handleUpdate(id)}>Update</button>
        <button className="btn-delete"onClick={() => deleteTodo(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
