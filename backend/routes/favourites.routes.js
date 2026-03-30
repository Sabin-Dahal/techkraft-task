import express from 'express';
import * as controller from '../controllers/favourite.controller.js';
import {protect} from "../middleware/auth.middleware.js";

const favRouter = express.Router();

favRouter.get("/", protect, controller.getFavourites);
favRouter.post("/:id", protect, controller.addFavourite);
favRouter.delete("/:id", protect, controller.removeFavourite);

export default favRouter;