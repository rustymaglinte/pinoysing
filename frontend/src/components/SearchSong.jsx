import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import SongContext from "../contexts/SongContext";
import "./SongInput.css"
import Select from "react-select";
import { debounce } from "lodash";

const SearchSong = () => {
    const { selectedOption, setSelectedOption } = useContext(SongContext); // Use the context

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [optionsToShow, setOptionsToShow] = useState([]);
    const [inputFocused, setInputFocused] = useState(false)

    const inputRef = useRef(null);

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


    // const handleSearch = (inputValue) => {
    //     setSearchQuery(inputValue);

    //     const query = searchQuery.toLowerCase();

    //     const filteredSongs = allSongs.filter((song) =>
    //         (song.title + " " + song.artist).toLowerCase().includes(query)
    //     );
    //     setSearchResults(filteredSongs);

    // }

    const handleSearch = debounce((inputValue) => {
        setSearchQuery(inputValue);
        const query = inputValue.toLowerCase();
        const filteredSongs = allSongs.filter((song) =>
            (song.title + " " + song.artist).toLowerCase().includes(query)
        );
        setSearchResults(filteredSongs);
        setOptionsToShow(inputValue ? filteredSongs : []);
    }, 1500);

    const handleBlur = () => {
        setSearchQuery(inputRef.current?.value);
        setInputFocused(false); // Update input focus state to false
        setOptionsToShow([]); // Hide options on blur
      
    };

    const handleFocus = () => {
        setSearchQuery(inputRef.current?.value);
        setInputFocused(true);
    }

    const options = optionsToShow.map((song) => ({
        value: song,
        label: song.title + " by " + song.artist
    }));


    return (
        <div className="songSearch-container">
            {/* <header>
                <h2>PinoySing</h2>
            </header> */}
            <h4>Select a Song...</h4>
            <div className="search-container">
                <Select
                    className="song-search"
                    value={searchResults}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="🔍 Search title or artist.."
                    onInputChange={handleSearch}
                    hideSelectedOptions={false}
                    onBlur={handleBlur} // Handle input blur to maintain input value
                    onFocus={handleFocus}
                    inputRef={(ref) => inputRef.current = ref}
                />

                {/* <input
                    type="text"
                    placeholder="🔎 Search a song..."
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                /> */}

                {/* {(isInputFocused && searchQuery !== '' && searchResults.length > 0) ? ( 
                   
                    <select
                        size={7}
                        className="song-search"
                        value={selectedOption}
                        onChange={handleSelectChange}

                    >
                        <option style={{ fontWeight: "bold", fontSize: "large" }}>Click to select...</option>
                        {searchResults.map((song) => (
                            <option
                                className="song-options"
                                key={song.youtubeID}
                                value={JSON.stringify(song)}
                                data-youtube-id={song.youtubeID}
                                ref={selectRef}
                            >
                                {song.title} by {song.artist}
                            </option>
                        ))}
                    </select>
                ) 
               
                : (
                    <div>
                    </div>
                )} */}







            </div>
        </div>
    )
}

export default SearchSong;
