import React, { useState } from "react";
import "./AddSong.css";
import axios from "axios";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const EditSong = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const songNumber1 = Number(queryParams.get("songNumber"));
    const title1 = queryParams.get("title");
    const artist1 = queryParams.get("artist");
    const youtubeID1 = queryParams.get("youtubeID");

    const [songNumber, setSongNumber] = useState(songNumber1);
    const [title, setTitle] = useState(title1);
    const [artist, setArtist] = useState(artist1);
    const [youtubeID, setYoutubeID] = useState(youtubeID1);


    const navigate = useNavigate();

    const BackToHome = () => {
        navigate("/pinoysing/admin")
    }

    const PinoySingAdmin = JSON.parse(localStorage.getItem("PinoySingAdmin"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userConfirmed = window.confirm("Are you sure you want to edit this song?");

        if (userConfirmed) {
            BackToHome(e);
        } else {
            return
        }

        try {
            const response = await axios.patch(`https://pinoysing-374a04dc1fef.herokuapp.com/pinoysing/${id}`, {
                songNumber: songNumber,
                title: title,
                artist: artist,
                youtubeID: youtubeID
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${PinoySingAdmin.token}`
                }
            });

            // Handle success
            console.log('Song edited successfully:', response.data);
            window.location.reload()
        } catch (error) {
            // Handle error
            console.error('Error editing song:', error.response ? error.response.data : error.message);
        }

        setSongNumber('')
        setTitle('')
        setArtist('')
        setYoutubeID('')
    }



    const handleCombinedSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
        // BackToHome(e);
    }

    return (
        <div className="add-song-container">
            <form className="add-song" onSubmit={handleCombinedSubmit} name="addSong">
                <h2>Edit Song</h2>
                <label>Song Number:</label>
                <input
                    onChange={(e) => setSongNumber(e.target.value)}
                    type="number"
                    value={songNumber}
                />
                <label>Title:</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                />
                <label>Artist:</label>
                <input
                    onChange={(e) => setArtist(e.target.value)}
                    type="text"
                    value={artist}
                />
                <label>YoutubeID:</label>
                <input
                    onChange={(e) => setYoutubeID(e.target.value)}
                    type="text"
                    value={youtubeID}
                />
                <button>Edit Song</button>

            </form>
            <div className="add-song">
                <Link to="/pinoysing/admin">
                    <button>Cancel</button>
                </Link>
            </div>
        </div>
    )
}

export default EditSong;