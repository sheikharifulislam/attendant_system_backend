const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    roles: {
        type: [String],
        require: true,
    },
    accountStatus: {
        type: String,
        require: true,
    },
});

const User = model("User", userSchema);
module.exports = User;
