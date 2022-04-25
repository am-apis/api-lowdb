import {Router} from 'express'
import { getTasks, createTask, getTask, deleteTask, updateTask, count} from '../controllers/task.controller'

const router = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          Task: 
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the auto-generated id of task
 *                  name:
 *                      type: string
 *                      description: the name of the task
 *                  description: 
 *                      type: string
 *                      description: the description of the task
 *              required:
 *                  - name
 *                  - description
 *              example:
 *                  id: uYfKuRLU2XsuPosT9Uq4C
 *                  name: One Task to do
 *                  description: I have to make this task
 *          TaskNotFound:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      description: a message for the not found task
 *              example:
 *                  msg: Task was not found
 *      parameters:
 *          taskId:
 *              in: path
 *              name: id
 *              require: true
 *              schema:
 *                  type: string
 *              description: the task id
 *               
 */


/**
 *  @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks endpoint
 */


/**
 * @swagger
 * /tasks:
 *      get:
 *          summary: Return a task list
 *          tags: [Tasks]
 *          responses:
 *              200:
 *                  description: the list of task
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Task'
 *                                  
 */
router.get('/tasks', getTasks)


/**
 * @swagger
 * /tasks/count:
 *      get:
 *          summary: Get total task count
 *          tags: [Tasks]
 *          responses:
 *              200:
 *                  description: the total number of task
 *                  content:
 *                      text/plain:
 *                          schemas:
 *                              type: integer
 *                              example: 10
 */
router.get('/tasks/count', count )


/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: Create a task
 *      tags: [Tasks]
 *      requestBody:
 *          required: true
 *          content:
 *              aplication/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          200:
 *              description: the task succesfully created
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          500:
 *              description: some server error
 *                                  
 */
router.post('/tasks' , createTask)


/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      summary: Get a task by id
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      responses:
 *          200:
 *              description: the task was found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          400:
 *              description: the task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 */
router.get('/tasks/:id', getTask) 


/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *      summary: Delete a task by id
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      responses:
 *          200:
 *              description: the task was deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: the task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 */
router.delete('/tasks/:id', deleteTask) 


/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      summary: Update a task by id
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/taskId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          200:
 *              description: the task was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: the task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 */
router.put('/tasks/:id', updateTask)



export default router