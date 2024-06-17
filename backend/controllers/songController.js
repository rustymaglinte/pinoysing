import mongoose from "mongoose";
import songModel from "../models/songModel.js";


//get all songs
const getAllSongs = async (req, res) => {
    try {
        const songs = await songModel.find().sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//get a single song
const getOneSong = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Song not found." })
    }

    try {
        const song = await songModel.findById(id)
        if (song) {
            res.status(200).json(song);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//post a song
const addSong = async (req, res) => {
    const { title, artist, songNumber, youtubeID } = req.body;
    try {
        const id = req._id;
        const song = await songModel.create({ title, artist, songNumber, youtubeID })
        res.status(200).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//delete a song
const deleteSong = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Song not found." })
    }

    try {
        const song = await songModel.findOneAndDelete({ _id: id })
        if (song) {
            res.status(200).json(song);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//update a song
const updateSong = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Song not found." })
    }

    try {
        const song = await songModel.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        if (song) {
            res.status(200).json(song);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

export { getAllSongs, getOneSong, addSong, deleteSong, updateSong };