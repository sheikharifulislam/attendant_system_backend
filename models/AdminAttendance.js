const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema(
    {
        timeLimit: {
            type: Number,
            max: 30,
            min: 5,
            default: 5,
            required: true,
        },
        status: {
            type: String,
            enum: ["RUNNING", "COMPLETED"],
            default: "RUNNING",
            required: true,
        },
    },
    { timestamps: true }
);

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = AdminAttendance;
