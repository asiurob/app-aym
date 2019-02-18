let mongo  = require('mongoose'),
    valid  = require('mongoose-unique-validator'),
    Schema = mongo.Schema

let UserSchema = new Schema({
    NAME:     { type: String, min:3, max:50, required: [true, 'The name is required'] },
    LASTNAME: { type: String, min:3, max:100, required: [true, 'The lastname is required'] },
    EMAIL:    { type: String, min:5, max:50, required: [true, 'The email is required'], unique:[true, 'The email must be unique'] },
    USERNAME: { type: String, min:3, max: 12, unique:[true, 'The username must be unique'] },
    PASSWORD: { type: String, min:10, max:70, required: [true, 'The password is required']},
    LOGIN_BACKLOG: { type: Array }
}, {collection: 'users'})


UserSchema.plugin( valid, { message: 'The {PATH} is required or duplicated' } )
module.exports = mongo.model('User', UserSchema )