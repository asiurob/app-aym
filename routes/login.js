let express = require('express'),
    User    = require('../models/user'),
    seed    = require('../config/seed').seed
    bcrypt  = require('bcryptjs'),
    jwt     = require('jsonwebtoken'),
    app     = express()


app.post('/', (req, res ) => {

    const user   = req.body.user,
          pass   = req.body.pass
          filter = { $or: [ { USERNAME: user }, { EMAIL: user } ] }
    
    if( !user || !pass ){
        return res.status(401).json({
            success: false,
            message: 'El usuario y/o contraseña son necesarios'
        })
    }
    
    User.findOne( filter, 'NAME LASTNAME USERNAME PASSWORD EMAIL')
        .exec(( err, data ) => {

        if( err ){
            return res.status(500).json({
                success: false,
                message: 'Ocurrió un error al conectar con el servidor, inténtalo nuevamente'
            })
        }

        if( !data ){
            return res.status(401).json({
                success: false,
                message: 'Las credenciales son incorrectas'
            })
        }

        if( !bcrypt.compareSync( pass, data.PASSWORD ) ){
            return res.status(401).json({
                success: false,
                message: 'Las credenciales son incorrectas'
            })
        }

        const login = { $push: { LOGIN_BACKLOG: { LAST_LOGIN : new Date() } } }
        User.findByIdAndUpdate( data._id, login, ( errlog ) => {

            if( errlog ){
                return res.status(500).json({
                    success: false,
                    errlog
                })  
            }

            delete data.PASSWORD      
            const token = jwt.sign({ user: data }, seed, { expiresIn: 21600 })

            res.status(200).json({
                success: true,
                message: `Bienvenido ${data.NAME} ${data.LASTNAME}`,
                user: data,
                token
            })

        })
    })
})

module.exports = app