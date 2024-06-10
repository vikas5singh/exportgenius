const express = require('express')
const usersRouter = require('./routes/usersRoutes')
const mediaRouter = require('./routes/mediaRoutes')
const bodyParser = require('body-parser');
const {cronMedia} = require('./lib/cron')
const path = require("path");
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/auth', usersRouter)
app.use('/api/v1/media', mediaRouter)
app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`);
    cronMedia()
})
