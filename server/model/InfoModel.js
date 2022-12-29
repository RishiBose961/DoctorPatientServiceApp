const { Schema, model } = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        max:9
    },
    type:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default:"https://api.multiavatar.com/unknown.svg"
    },
},{timestamps: true}
)

const User = model("User",userSchema)
module.exports = User
