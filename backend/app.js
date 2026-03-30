// src/app.js

import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import propertyRouter from "./routes/property.routes.js";
import favRouter from "./routes/favourites.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  // credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use('/img', express.static('img'));

app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/favourites", favRouter);


export default app;