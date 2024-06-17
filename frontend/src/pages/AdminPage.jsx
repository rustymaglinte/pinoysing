import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import axios from "axios";
import Login from "../components/Login";
import AddSong from "../components/AddSong";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const AdminPage = () => {

    const [allSongs, setAllSongs] = useState([])

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://pinoysing-374a04dc1fef.herokuapp.com/pinoysing');
                setAllSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const PinoySingAdmin = JSON.parse(localStorage.getItem("PinoySingAdmin"));

    const deleteSong = async (songId) => {

        const userConfirmed = window.confirm("Are you sure you want to delete this song?");

        if (!userConfirmed) {
            // User canceled the deletion
            return;
        }

        try {
            const response = await axios.delete(`https://pinoysing-374a04dc1fef.herokuapp.com/pinoysing/${songId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${PinoySingAdmin.token}`
                    }
                });

            // Handle success
            console.log('Song deleted successfully:', response.data);
            window.location.reload()

        } catch (error) {
            // Handle error
            console.error('Error deleting song:', error.response ? error.response.data : error.message);
        }
    }

    return (


        <div className="admin-content-container">

            <div>
                <AddSong />
            </div>
            <div className="fetched-songs">
                <h2>Song List</h2>
                {allSongs && allSongs.map((song) => (
                    <div key={song.youtubeID} className="individual-song">
                        <p>
                            {song.songNumber} {song.title} by {song.artist}
                        </p>
                        <hr />

                        <Link to={`/pinoysing/admin/edit/${song._id}?title=${song.title}&songNumber=${song.songNumber}
                                    &artist=${song.artist}&youtubeID=${song.youtubeID}`}>
                            <button>
                                Edit Song
                            </button>
                        </Link>
                        <Link>
                            <button
                                onClick={() => deleteSong(song._id)}
                                onChange={(e) => e.target.value}
                                value={song._id}
                            >
                                Delete Song
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default AdminPage;