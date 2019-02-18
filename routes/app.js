let express = require('express'),
    app     = express()

app.get('/', (req, res)=>{

    res.status(200).json({
        success: false,
        message: 'No se puede construir la ruta'
    })
})

module.exports = app