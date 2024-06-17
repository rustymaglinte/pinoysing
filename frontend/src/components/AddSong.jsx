import React, { useState } from "react";
import "./AddSong.css";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";

const AddSong = () => {

    const [songNumber, setSongNumber] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [youtubeID, setYoutubeID] = useState("");

    const { logout } = useLogout();

    const PinoySingAdmin = JSON.parse(localStorage.getItem("PinoySingAdmin"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userConfirmed = window.confirm("Are you sure you want to add this song?");

        if (!userConfirmed) {
            return;
        }

        try {
            const response = await axios.post('https://pinoysing-374a04dc1fef.herokuapp.com/pinoysing', {
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
            console.log('Song added successfully:', response.data);
            window.location.reload()
        } catch (error) {
            // Handle error
            console.error('Error adding song:', error.response ? error.response.data : error.message);
        }

        setSongNumber('')
        setTitle('')
        setArtist('')
        setYoutubeID('')
    }

    const handleLogout = () => {
        const userConfirmed = window.confirm("Are you sure you want to Log-out?");

        if (!userConfirmed) {
            // User canceled the deletion
            return;
        }

        logout();
        window.location.reload()
    }

    return (
        <div>
            <form className="add-song" onSubmit={handleSubmit} name="addSong">
                <h2>Add a Song</h2>
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
                <button>Add Song</button>
            </form>
            <div className="logout-button-container">
                <button
                    onClick={handleLogout}            
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default AddSong;