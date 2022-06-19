const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrationController = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Invalid Data",
        });
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Registered",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = await new User({
            name,
            email,
            password: hashPassword,
        });
        user.save();

        res.status(201).json({
            success: true,
            error: false,
            user,
        });
    } catch (error) {
        next(error);
    }
};

exports.loginController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Email Or Password Invalid",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Email Or Password Invalid",
        });
    }

    delete user._doc.password;
    const token = jwt.sign(user._doc, "secrect-key", { expiresIn: "2days" });

    res.status(200).json({
        error: false,
        success: true,
        message: "Login Successfully",
        token,
    });
};
