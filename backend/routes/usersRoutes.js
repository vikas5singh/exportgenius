const express = require('express')
const router = express.Router()
const { Register, logIn, profile, update,getAllTodo, getTodoById, updateTodo, deleteTodo } = require("../controllers/users")
const validator = require('../validators/validators/user.validation')
const authorizer = require("../middleware/authentication");
router.post('/signup', validator.createUser, Register)
router.post('/login', validator.login, logIn)
router.get('/profile', authorizer, profile)
router.put('/update/:id',validator.updateUser, update)
router.get('/get-todo/:id', getTodoById)
router.put('/update-todo/:id', updateTodo)
router.delete('/delete-todo/:id', deleteTodo)
module.exports = router
