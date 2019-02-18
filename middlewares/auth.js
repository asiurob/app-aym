var jwt  = require('jsonwebtoken'),
    seed = require('../config/seed').seed

exports.validateToken = ( req, res, next ) => {

    const token = req.body.token;

    jwt.verify( token, seed, ( error, decoded ) => {

        if( error ){
            return res.status(401).json({
                success: false,
                message: 'Token malformado o expirado',
                err
            })
        }

        req.user = decoded.user
        next()
    })
}