let express = require('express'),
    User    = require('../models/user'),
    bcrypt  = require('bcryptjs'),
    jwt     = require('jsonwebtoken'),
    seed    = require('../config/seed').seed,
    app     = express()


app.get('/', (req, res)=>{

    User.find(id, (err, data)=>{

    })
})

app.use('/', ( req, res, next ) => {

    const token = req.body.token

    jwt.verify( token, seed, ( err ) => {

        if( err ){
            return res.status(401).json({
                success: false,
                message: 'Session invalid or expired',
            })
        }
    })

    next();
})

app.put('/', ( req, res ) => {

    const pass = req.body.password ? bcrypt.hashSync( req.body.password, 10 ) : '' 

    let user = new User({
        NAME:     req.body.name,
        LASTNAME: req.body.lastname,
        EMAIL:    req.body.email,
        USERNAME: req.body.username,
        PASSWORD: pass
    })

    user.save( (err, saved) =>{

        if( err ){
            return res.status(500).json({
                success: false,
                message: 'Ocurrió un error al conectar con el servidor, inténtalo nuevamente',
                err
            })
        }

        if( !saved ){
            return res.status(400).json({
                success: false,
                message: 'Error al guardar la información, inténtalo nuevamente'
            })
        }

        res.status(200).json({
            success: true,
            message: 'El usuario fue creado correctamente'
        })
        
    })

})

module.exports = app