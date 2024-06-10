const express = require('express')
const router = express.Router()
const { Register, logIn, profile, update} = require("../controllers/users")
const validator = require('../validators/validators/user.validation')
const authorizer = require("../middleware/authentication");
router.post('/signup', validator.createUser, Register)
router.post('/login', validator.login, logIn)
router.get('/profile', authorizer, profile)
router.put('/update/:id',validator.updateUser, update)
module.exports = router
