import React, { useContext, useEffect } from "react";
import SongContext from "../contexts/SongContext";
import "./SongInput.css"

const ReservedSongs = ({ nextMusic }) => {
    const { reservedSongs, displayWait, display } = useContext(SongContext);

    return (
        <div className="reserved-container">
            <h4>Reserved Songs:</h4>
            <div className="reserved-songs">
                {reservedSongs.map((song, index) => {

                    return (

                        <button
                            className="my-reserved-songs"
                            key={(song.value.youtubeID + index)}
                            style={{
                                backgroundColor: index === 0 ? '#ffcb61' : '#ffff',
                                fontWeight: index === 0 ? 'bold' : 'normal'
                            }}>
                            {song.value.title + " by " + song.value.artist}
                        </button>
                    );
                })}

            </div>
            <div className="next-song">
                <p
                    style={{
                        display: displayWait,
                        color: 'red',
                        fontStyle: 'italic'
                    }}
                >Please wait a moment...
                </p>
                <button
                    onClick={nextMusic}
                    style={{
                        display: display
                    }}
                >
                    Next Song
                </button>
            </div>
        </div>
    );
}

export default ReservedSongs;
