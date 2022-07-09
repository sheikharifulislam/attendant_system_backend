const User = require("../models/User");
const userService = require("../services/user");

const getUsers = async (req, res, next) => {
    /**
     * TODO: filter, sort,pagination,select
     */
    try {
        const users = await userService.findUsers();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
const getUserById = (req, res, next) => {};
const postUser = (req, res, next) => {};
const patchUserById = (req, res, next) => {};
const deleteUserById = (req, res, next) => {};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    patchUserById,
    deleteUserById,
};
