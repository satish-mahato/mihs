require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const connect = require("./db/db.js");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const galleryRoutes = require("./routes/galleryRoutes.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Connect to the database
connect();

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'files' directory
app.use(
  "/files",
  express.static(path.join(__dirname, "files"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
      }
    },
  })
);

// Middleware to ensure 'files' folder exists
const ensureFilesFolder = (req, res, next) => {
  const filesDir = path.join(__dirname, "files");
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
  }
  next();
};

// Apply the middleware globally
app.use(ensureFilesFolder);

// API routes
app.use("/users", userRoutes);
app.use("/api", fileRoutes);
app.use("/api", galleryRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

// Start the server
const PORT = process.env.PORT || 5001; // Fallback to 5001 if PORT is not defined
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
