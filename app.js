const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const uesrRoutes = require("./routes/user");
const chatRoutes = require('./routes/chatRoutes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// connection to MongoDB database
// .connect(process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
  
  // https://rps-moresarai.netlify.app
const corsOption = {
  // origin:"https://rps-moresarai.netlify.app",
  origin: "http://localhost:5173",
  credentials: true,
  method: "GET POST DELETE PUT",
};

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.get("/api/getToken", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    res.status(200).json({ success: true, token: token });
  } else {
    res.status(200).json({ success: false, token: null });
  }
});
app.use("/api/students", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/user", uesrRoutes);
app.use("/api/chatAi", chatRoutes);

app.all("*", (req, res, next) => {
  res.status(404).send("<h1>PAGE NOT FOUND<h1/>");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
