const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");
const error = require("../utils/error");

const registerService = async (name, email, password, roles, accountStatus) => {
    let user = await findUserByProperty("email", email);
    if (user) {
        throw error("User Already Registered", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return createNewUser(name, email, hashPassword, roles, accountStatus);
};

const loginService = async (email, password) => {
    const user = await findUserByProperty("email", email);
    if (!user) {
        throw error("Email Or Password Invalid", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw error("Email Or Password Invalid", 400);
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    };
    const token = jwt.sign(payload, "secrect-key", {
        expiresIn: "2days",
    });

    return token;
};

module.exports = {
    registerService,
    loginService,
};
