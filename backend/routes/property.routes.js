import express from "express";
import * as controller from "../controllers/property.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const propertyRouter = express.Router();
propertyRouter.get("/", protect, controller.getAll);
propertyRouter.get("/:id", protect, controller.getById);

export default propertyRouter;
