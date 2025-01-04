require("dotenv").config();

const express = require("express");
const connect = require("./db/db.js");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

connect();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files", express.static("files"));

app.use('/users', userRoutes);
app.use("/api", fileRoutes);


app.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
