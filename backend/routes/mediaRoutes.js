const express = require('express')
const router = express.Router()
const validator = require('../validators/validators/user.validation')
const authorizer = require("../middleware/authentication");
const mediaController = require('../controllers/media')
const {upload} = require('../lib/uploadImg')
router.post('/upload', authorizer, upload.single('image'),mediaController.uploadMedia)
router.get('/view/:id', authorizer,mediaController.view)
router.get('/list', authorizer,mediaController.list)
module.exports = router
