import express  from "express"
import cors from 'cors'
import morgan from 'morgan'

// Swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swaggerOptions"

import taskRoutes from './routes/tasks.routes'

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const specs = swaggerJSDoc(options)

app.use(taskRoutes)
app.use('/', swaggerUI.serve, swaggerUI.setup(specs))



export default app

