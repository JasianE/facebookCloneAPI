const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    message: {type: String, required: true},
    likes: {type: Number, required: true}
})
const UserSchema = new Schema({
    username: {type: String, required: true},
    firstname: {type: String, required: true},
    email: {type: String, required: true},
    lastname: {type: String, required: true},
    friends: [],
    password: {type: String, required: true},
    comments: {
        type: [ CommentSchema ],
        default: [{
            message: 'Hello',
            likes: 0
        }]
    }
})

module.exports = mongoose.model('User', UserSchema)