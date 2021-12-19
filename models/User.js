const {Schema, model} = require("mongoose");


const user = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    words: [{type: Object, ref: 'Word'}]
});


module.exports = model("User", user);