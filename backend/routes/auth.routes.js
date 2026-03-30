import express from "express";
import * as controller from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);

export default authRouter;
