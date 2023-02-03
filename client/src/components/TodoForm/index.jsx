import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const TodoForm = ({
    title,
    description,
    setDescription,
    setTitle,
    todos,
    setTodos,
    isUpdate,
    setIsUpdate,
    idUpdated,
}) => {
    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const todo = {
                title,
                description,
            };
            const response = await axios.post(
                'https://api-todos-0ylw.onrender.com/api/v1/todos',
                todo,
            );
            const newTodos = [...todos, response.data];
            setTodos(newTodos);
            toast.success('Add todo successfully!');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data);
        }
    };
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const updateTodo = {
                title,
                description,
            };
            const newTodos = todos.map((todo) => {
                if (todo._id === idUpdated) {
                    todo.title = title;
                    todo.description = description;
                }
                return todo;
            });
            // console.log(newTodos)
            const response = await axios.put(
                `https://api-todos-0ylw.onrender.com/api/v1/todos/${idUpdated}`,
                updateTodo,
            );
            setTitle('');
            setDescription('');
            setIsUpdate(false);
            // console.log(response);
            toast.success('Updated todo successfully!');
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data);
        }
    };
    const removeUpdate = () => {
        setIsUpdate(false);
        setTitle('');
        setDescription('');
        toast.success('Closed form update!');
    };
    return (
        <>
            <form onSubmit={isUpdate ? handleSubmitUpdate : addTodo}>
                <div>
                    <label htmlFor="title">Title : </label>
                    <input
                        type="text"
                        value={title}
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Des : </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <input type="submit" value={isUpdate ? 'Update' : 'Add todo'} />
                {isUpdate && (
                    <button onClick={removeUpdate} type="button">
                        x
                    </button>
                )}
            </form>
        </>
    );
};

export default React.memo(TodoForm);
