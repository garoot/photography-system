const express = require('express')
// require('dotenv').config()
// const connection = require('./db')
const app = express()
require('./config/mongoose.config')
const cors = require('cors')
app.use(cors())
app.use(express.json(), express.urlencoded({extended: false}) )
// const photographerRoutes = require('./routes/photographer.routes')
// photographerRoutes(app)
// app.listen(8000, () => console.log('Server is connected on port 8000') )



const api = require('./routes/photographer.routes')

app.use('/public/', express.static('public'))
// if starts with /api go to api: photographer.routes
app.use('/api/photos', api)

const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log('connected to port ' + port)
})

app.use((req,res,next) => {
    setImmediate(()=> {
        next(new Error('Something went wrong'))
    })
})

app.use(function (err,req,res,next) {
    console.error(err.message)
    if(!err.statusCode) err.static = 500
    res.status(err.statusCode).send(err.message)
})