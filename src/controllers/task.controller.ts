import { Handler } from "express"
import { getConnection } from "../db"
import { nanoid } from "nanoid"

// GET ALL TASKS
export const getTasks: Handler = (req, res) => {
    const data = getConnection().get('tasks').value()
    return res.json(data)
}


// CREATE A TASK
export const createTask: Handler = (req, res) => {


    const { name, description } = req.body
    //res.send(req.body)

    const newTask = {
        name,
        description,
        id: nanoid()
    }

    try {
        getConnection().get('tasks').push(newTask).write()
        res.json(newTask)
    } catch (error) {
        res.status(500).send(error)
    }
}


// GET ONE TASK BY ID
export const getTask: Handler = (req, res) => {

    const taskFound = getConnection()
        .get('tasks')
        .find({ id: req.params.id })
        .value()

    if (!taskFound) return res.status(404).json({ msg: 'Task was not found' })

    res.json(taskFound)
}


// COUNT NUMBER OF TASKS
export const count: Handler = (req, res) => {
    const taskLength = getConnection().get('tasks').value().length
    res.json(taskLength)
}


// DELETE ONE TASKS
export const deleteTask: Handler = (req, res) => {

    const taskFound = getConnection()
        .get('tasks')
        .find({ id: req.params.id })
        .value()

    if (!taskFound) return res.status(404).json({ msg: 'Task was not found' })

    const deletedTask = getConnection()
        .get('tasks')
        .remove({ id: req.params.id })
        .write()

    res.json( [{message:'the task was deleted'},deletedTask[0]] )

}


//UPDATE TASK
export const updateTask: Handler = (req, res) => {

    const taskFound = getConnection()
        .get('tasks')
        .find({ id: req.params.id })
        .value()
return console.log(taskFound)
    if (!taskFound) return res.status(404).json({ msg: 'Task was not found' })

    const updatedTask = getConnection()
        .get('tasks')
        .find({ id: req.params.id })
        .assign(req.body)
        .write()

    res.json(updatedTask)


}