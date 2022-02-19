const express = require('express')
const app = express()
const connect = require('./configs/db')
app.use(express.json())

const loginTeacher = require('./controller/teacher.controller')
const studentController = require('./controller/student.controller')
const testController = require('./controller/test.controller')

app.use('/loginTeacher', loginTeacher)
app.use('/test', testController)
app.use('/student', studentController)

app.listen(5000, async () => {
    connect()
    console.log('listening on port 5000');
})