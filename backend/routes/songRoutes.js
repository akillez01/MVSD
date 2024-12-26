import express from "express";
import {
  addSong,
  addThumbnail,
  createAlbum,
  deleteSong,
  getAllAlbums,
  getAllSongs,
  getAllSongsByAlbum,
  getSingleSong,
} from "../controllers/songControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadMiddleware from "../middlewares/upload.js";

const router = express.Router();

router.post("/album/new", isAuth, uploadMiddleware, createAlbum);
router.get("/album/all", isAuth, getAllAlbums);
router.post("/new", isAuth, uploadMiddleware, addSong);
router.post("/:id", isAuth, uploadMiddleware, addThumbnail);
router.get("/single/:id", isAuth, getSingleSong);
router.delete("/:id", isAuth, deleteSong);
router.get("/all", isAuth, getAllSongs);
router.get("/album/:id", isAuth, getAllSongsByAlbum);

export default router;
