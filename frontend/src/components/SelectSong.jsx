import React, { useContext, useEffect } from "react";
import SongContext from "../contexts/SongContext";
import "./SongInput.css"

const SelectSong = () => {

    const { selectedOption, setSelectedOption, reservedSongs, setReservedSongs, selectedMusic, setSelectedMusic, display, isScoring, displayWait } = useContext(SongContext)

    const reserve = async () => {
        const updatedReservedSongs = [...reservedSongs, selectedOption];
        try {
            if (!reservedSongs.includes(selectedOption)) {
                setReservedSongs(updatedReservedSongs)
                // console.log(updatedReservedSongs);
            } else {
                setReservedSongs(reservedSongs)
                console.log("Song already reserved.");
            }
            setSelectedOption('')
        } catch (error) {
            console.log(error);
        }
    }

    const remove = () => {
        setSelectedOption('')
    }

    useEffect(() => {
        if (selectedOption) {
            setSelectedMusic((selectedOption))
        }

    }, [selectedOption])

    useEffect(() => {
        if (isScoring) {
            setSelectedOption('')
        }
    }, [isScoring])

    return (
        <div className="select-container">
            <h4>Selected Song:</h4>
            <div className="select">
                {selectedOption &&
                    <div>
                        <h4>{selectedMusic && (selectedMusic.label)}</h4>
                        <p
                            style={{
                                display: displayWait
                            }}
                        >Please wait a moment...
                        </p>
                        <button
                            onClick={reserve}
                            className="reserve-button"
                            style={{ display: display }}
                        >
                            Reserve
                        </button>
                        <button
                            className="remove-button"
                            onClick={remove}
                        >
                            Remove
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default SelectSong;