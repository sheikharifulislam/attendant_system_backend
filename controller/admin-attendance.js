const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const getEnable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (running) {
            throw error("TimeSheet alredy running", 400);
        }
        const attendance = new AdminAttendance({});
        await attendance.save();
        return res.status(200).json({ message: "Success", attendance });
    } catch (err) {
        next(err);
    }
};

const getStatus = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (!running) {
            throw error("Not running", 400);
        }
        return res.status(200).json(running);
    } catch (err) {
        next(err);
    }
};

const getDisable = (req, res, next) => {};

module.exports = {
    getEnable,
    getStatus,
    getDisable,
};
