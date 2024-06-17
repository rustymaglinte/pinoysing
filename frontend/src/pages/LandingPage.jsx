import React, { useState } from "react";
import SearchSong from "../components/SearchSong";
import SelectSong from "../components/SelectSong";
import SongContext from "../contexts/SongContext";
import ReservedSongs from "../components/ReservedSongs";
import "./Landing.css"
import VideoFrame from "../components/VideoFrame";
import SEO from "../components/SEO";
import Credits from "../components/Credits";

const LandingPage = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [reservedSongs, setReservedSongs] = useState([]);
    const [youtubeID, setYoutubeID] = useState('')
    const [selectedMusic, setSelectedMusic] = useState({})
    const [display, setDisplay] = useState("inline");
    const [isScoring, setIsScoring] = useState(false)
    const [displayWait, setDisplayWait] = useState('none')

    const nextMusic = () => {
        if (reservedSongs.length > 0) {
            const updatedReservedSongs = reservedSongs.slice(1);
            setReservedSongs(updatedReservedSongs);
            // console.log(updatedReservedSongs);
        }
    }

    return (
        <SongContext.Provider
            value={{
                selectedOption, setSelectedOption,
                reservedSongs, setReservedSongs,
                youtubeID, setYoutubeID,
                selectedMusic, setSelectedMusic,
                display, setDisplay,
                isScoring, setIsScoring,
                displayWait, setDisplayWait
            }}>

            <div className="landing-container">
                <div className="videoframe">
                    <VideoFrame nextMusic={nextMusic} />
                </div>
                <div className="input-container">
                    <header>
                        <h2>PinoySing</h2>
                    </header>
                    <SearchSong />
                    <SelectSong />
                    <ReservedSongs nextMusic={nextMusic} />
                    {/* <Credits /> */}
                </div>
                <SEO
                    title={"PinoySing - Online Karaoke"}
                    description={"Sing along to your favorite songs - simple, fun and free."}
                    photo={
                        <img
                            src="../assets/logo.png"
                            alt="PinoySing Logo"
                        />}
                />

            </div>
        </SongContext.Provider>
    )
}

export default LandingPage;