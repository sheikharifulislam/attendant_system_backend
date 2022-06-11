const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Profile = model("Profile", profileSchema);
module.exports = Profile;
