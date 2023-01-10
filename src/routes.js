const express = require('express')
const router = express.Router()

const { createStudent, getStudent, deleteStudent } = require('./studentController')

router.post('/students', createStudent)

router.get('/students', getStudent)

router.delete('/students/:name/:subject', deleteStudent)

module.exports = router
