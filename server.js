require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db");
const { authenticate } = require("./middleware/authenticate");
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/private", authenticate, async (req, res, next) => {
    try {
        res.status(200).json({
            message: "I am private route ",
        });
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    const message = err.message ? err.message : "Server Error Occured";
    const status = err.status ? err.status : 500;
    console.log(err.message);
    res.status(status).json({
        message,
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
