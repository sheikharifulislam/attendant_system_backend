const { registerService, loginService } = require("../services/auth");

exports.registrationController = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Invalid Data",
        });
    }
    try {
        const user = await registerService(name, email, password);
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
    try {
        const token = await loginService(email, password);

        res.status(200).json({
            error: false,
            success: true,
            message: "Login Successfully",
            token,
        });
    } catch (e) {
        next(e);
    }
};
