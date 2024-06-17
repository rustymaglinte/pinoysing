import express from "express";
import { getAllSongs, getOneSong, addSong, deleteSong, updateSong} from "../controllers/songController.js"
import { requireAuth } from "../middlewares/requireAuth.js";

const songRouter = express.Router();

songRouter.get("/", getAllSongs);

songRouter.get("/:id", getOneSong);

songRouter.use(requireAuth)

songRouter.post("/", addSong);

songRouter.delete("/:id", deleteSong);

songRouter.patch("/:id", updateSong);

export default songRouter;