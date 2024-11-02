const mongoose = require('mongoose');

let mongoURL = process.env.MONGO_URL
// Connect to MongoDB
mongoose.connect(mongoURL);

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    name : String,
    email : {type:String, unique:true},
    password : String
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    userId : mongoose.Schema.ObjectId,
    title : String,
    body : String,
    status : String,
    priority : String,
    created_at : Date
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}