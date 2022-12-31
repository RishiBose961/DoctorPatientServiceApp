const { Schema, model, mongoose } = require('mongoose')


const userPost = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    help: {
        type: String,
        required: true
    },
    comments: [{
        postedBy:{type: mongoose.Schema.Types.ObjectId,ref: "User"},
        text: String,
        
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true }
)

const UserPost = model("UserPost", userPost)
module.exports = UserPost
