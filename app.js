// Crear dependencias
let express = require('express'),
    mongo   = require('mongoose'),
    parser  = require('body-parser'),
    route   = './routes/',
    app     = express()

//MongoDB
mongo.connect('mongodb://localhost:27017/aymDB', ( err ) =>{
    if( err ) throw err
    console.log('MongoDB running')
})

//Implementación middlewares
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})


//Uso de rutas
app.use( '/user', require('./routes/user') )
app.use( '/login', require('./routes/login') )
app.use( '/account', require('./routes/account') )


//Incializar servidor
app.use('/', require('./routes/app'))
app.listen(3000, () => {
    console.log('Express running')
})