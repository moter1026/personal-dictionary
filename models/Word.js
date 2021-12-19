const {Schema, model} = require("mongoose");


const word = new Schema({
    username: {type: String, unique: true, required: true},
    wordCandidat: [{type: Array}]
})

module.exports = model("Word", word);