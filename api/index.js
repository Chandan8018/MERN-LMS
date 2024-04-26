import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import userRouters from "./routes/user.route.js";
import authRouters from "./routes/auth.route.js";
import postRouters from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import studentRouters from "./routes/student.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected..");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server running on port number ${port}`);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management System",
      version: "1.0.0",
      description: "MERN stack library management API",
      contact: {
        name: "Chandan Kumar Sahoo",
        email: "chandankumarsahoo@gmail.com",
        url: "https://github.com/Chandan8018",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./api/routes/*.js"],
};

const specification = swaggerJSDoc(options);

app.use("/api/user", userRouters);
app.use("/api/auth", authRouters);
app.use("/api/post", postRouters);
app.use("/api/comment", commentRoutes);
app.use("/api/student", studentRouters);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specification));

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

//Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
