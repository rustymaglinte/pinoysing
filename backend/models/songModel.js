import mongoose from "mongoose";

const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true
    },
    songNumber: {
        type: Number,
        required: true,
        unique: true
    },
    youtubeID: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const songModel = mongoose.model("pinoySingFile", songSchema);

export default songModel;
