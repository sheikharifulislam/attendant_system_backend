const { addMinutes, isAfter } = require("date-fns");
const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const getAttendance = async (req, res, next) => {
    try {
        const { id } = req.params;
        const adminAttendance = await AdminAttendance.findById(id);
        if (!adminAttendance) {
            throw error("Invalid Attendance Id", 400);
        }
        if (adminAttendance.status === "COMPLETED") {
            throw error("Attendance not running", 400);
        }

        let attendance = await StudentAttendance.findOne({
            adminAttendance: id,
            user: req.user._id,
        });
        if (attendance) {
            throw error("Already Attendance", 400);
        }

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id,
        });

        await attendance.save();
        return res.status(201).json(attendance);
    } catch (err) {
        next(err);
    }
};

const getAttendanceStatus = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (!running) {
            throw error("Not running", 400);
        }
        const endTime = addMinutes(
            new Date(running.createdAt),
            running.timeLimit
        );
        if (isAfter(new Date(), endTime)) {
            running.status = "COMPLETED";
            await running.save();
        }
        return res.status(200).json(running);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAttendance,
    getAttendanceStatus,
};
