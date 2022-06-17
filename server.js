require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();
const connectDB = require("./db");

app.use(cors());
app.use(express.json());

app.post("/registration", async (req, res, next) => {
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
});

app.post("/login", async (req, res, next) => {
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

    res.status(200).json({
        error: false,
        success: true,
        message: "Login Successfully",
        user,
    });
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        message: "Server Error Occured",
    });
});

const port = process.env.PORT || 5000;
connectDB("mongodb://localhost:27017/attendant-system")
    .then(() => {
        console.log("Database connection established");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
