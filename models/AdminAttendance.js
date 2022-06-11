const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema({
    timeLimit: {
        type: number,
        required: true,
    },
    status: {
        type: string,
        required: true,
    },
    createAt: {
        type: Date,
        require: true,
    },
});

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = AdminAttendance;
