"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.count = exports.getTask = exports.createTask = exports.getTasks = void 0;
const db_1 = require("../db");
const nanoid_1 = require("nanoid");
// GET ALL TASKS
const getTasks = (req, res) => {
    const data = (0, db_1.getConnection)().get('tasks').value();
    return res.json(data);
};
exports.getTasks = getTasks;
// CREATE A TASK
const createTask = (req, res) => {
    const { name, description } = req.body;
    const newTask = {
        name,
        description,
        id: (0, nanoid_1.nanoid)()
    };
    try {
        (0, db_1.getConnection)().get('tasks').push(newTask).write();
        res.json(newTask);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.createTask = createTask;
// GET ONE TASK BY ID
const getTask = (req, res) => {
    const taskFound = (0, db_1.getConnection)()
        .get('tasks')
        .find({ id: req.params.id })
        .value();
    if (!taskFound)
        return res.status(404).json({ msg: 'Task was not found' });
    res.json(taskFound);
};
exports.getTask = getTask;
// COUNT NUMBER OF TASKS
const count = (req, res) => {
    const taskLength = (0, db_1.getConnection)().get('tasks').value().length;
    res.json(taskLength);
};
exports.count = count;
// DELETE ONE TASKS
const deleteTask = (req, res) => {
    const taskFound = (0, db_1.getConnection)()
        .get('tasks')
        .find({ id: req.params.id })
        .value();
    if (!taskFound)
        return res.status(404).json({ msg: 'Task was not found' });
    const deletedTask = (0, db_1.getConnection)()
        .get('tasks')
        .remove({ id: req.params.id })
        .write();
    res.json([{ message: 'the task was deleted' }, deletedTask[0]]);
};
exports.deleteTask = deleteTask;
//UPDATE TASK
const updateTask = (req, res) => {
    const taskFound = (0, db_1.getConnection)()
        .get('tasks')
        .find({ id: req.params.id })
        .value();
    return console.log(taskFound);
    if (!taskFound)
        return res.status(404).json({ msg: 'Task was not found' });
    const updatedTask = (0, db_1.getConnection)()
        .get('tasks')
        .find({ id: req.params.id })
        .assign(req.body)
        .write();
    res.json(updatedTask);
};
exports.updateTask = updateTask;
