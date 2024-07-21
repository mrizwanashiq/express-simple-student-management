import express from 'express'
import mongoose from 'mongoose'
import teacherRoute from './routes/teacher.js'
import classRoute from './routes/class.js'
import courseRoute from './routes/course.js'
import studentRoute from './routes/student.js'

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/student-management");

const connection = mongoose.connection;

connection.once("connected", () => console.log("Database Connected ~"));

app.use('/teacher', teacherRoute)
app.use('/class', classRoute)
app.use('/course', courseRoute)
app.use('/student', studentRoute)

app.listen(3000, () => console.log("server is up and running at port 3000"))