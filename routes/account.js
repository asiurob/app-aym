let express = require('express'),
    mdAuth  = require('../middlewares/auth'),
    Usuario = require('../models/user'),
    app     = express()


app.post('/', [mdAuth.validateToken], (req, res ) =>{
    
    Usuario.findById( req.user._id, (err, data) =>{

        if( err ){
            return res.status(500).json({
                success: false,
                message: 'Ocurrió un error al conectar con el servidor, inténtalo nuevamente'
            })
        }

        if( !data ){
            return res.status(400).json({
                success: false,
                message: 'No fue posible encontrar sus credenciales'
            })
        }

        res.status(200).json({
            success: true,
            messsage: 'Petición correcta',
            data
        })

    })
})

module.exports = app