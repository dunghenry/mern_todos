const Todo = require('../models/Todo');
const logEvents = require('../helpers/logEvents');
const todoController = {
    getTodo: async (req, res) => {
        try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) return res.status(404).json('Todo not found!!');
            return res.status(200).json(todo);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    getTodos: async (req, res) => {
        try {
            const todos = await Todo.find({});
            if (!todos) return res.status(404).json('Todos not found!!');
            return res.status(200).json(todos);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    createTodo: async (req, res) => {
        if(!req.body.title || !req.body.description) return res.status(400).json("Missing title or description!")
        try {
            const todo = await Todo.findOne({ title: req.body.title });
            if (todo) return res.status(400).json("Title already taken!");
            const newTodo = new Todo(req.body);
            const savedTodo = await newTodo.save();
            return res.status(201).json(savedTodo);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    updateTodo: async (req, res) => {
        if (!req.body.title || !req.body.description) return res.status(400).json("Missing title or description!")
        try {
            const todoUpdate = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(todoUpdate);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    deleteTodo: async (req, res) => {
        try {
            await Todo.findByIdAndDelete(req.params.id);
            return res.status(200).json("Deleted todo successfully!");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    }

}
module.exports = todoController;