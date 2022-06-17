const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address`,
        },
        required: [true, "User email required"],
    },
    password: {
        type: String,
        minlength: [6, "Password is too short"],
        required: true,
    },
    roles: {
        type: [String],
        default: ["STUDENT"],
        required: true,
    },
    accountStatus: {
        type: String,
        enum: ["PENDING", "ACTIVE", "REJECTED"],
        default: "PENDING",
        required: true,
    },
});

const User = model("User", userSchema);
module.exports = User;
