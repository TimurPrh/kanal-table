require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.use('/api', router)

app.get('/', (req, res) => res.send('index.html'))

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
  try {
    app.listen(process.env.APP_PORT, process.env.APP_IP, () => console.log(`Server started on port ${process.env.APP_PORT}...`))
  } catch (e) {
    console.log(e)
  }
}

start()