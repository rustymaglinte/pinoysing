import React, { useContext, useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';
import "./VideoFrame.css";
import SongContext from '../contexts/SongContext';

const VideoFrame = ({ nextMusic }) => {

    const { reservedSongs, setDisplay, setIsScoring, setDisplayWait } = useContext(SongContext);

    const [youtubeID, setYoutubeID] = useState('');

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            origin: window.location.origin
        },
    };

    const onReady = (event) => {

        event.target.playVideo();

    }

    const onEnd = () => {
        setDisplayWait("inline")
        setDisplay("none")
        setIsScoring(true)
    
        const score = Math.floor(Math.random() * 14) + 87;
        const youtubeIds = {
            87: 'hNFa1MMEq30',
            88: '4z7FAK9Gf9g',
            89: 'mXelEZtT7lA',
            90: '027WqqHPzm0',
            91: '9Ash_etugqw',
            92: 'BxzXYgff8Mk',
            93: 'fYvHu2bwdrg',
            94: 'sXXVuoNdaKc',
            95: 'B9wUswWo3ig',
            96: 'N33nkBWWi88',
            97: 'tG2-cczJBE4',
            98: 'HyCmZ1gisM4',
            99: 'RoFxKIliIQQ',
            100: '9vcfpoYuSVE'
        };
    
        setYoutubeID(youtubeIds[score] || '40-3so6UqpI');
    
        setTimeout(() => {
            nextMusic();
            setTimeout(() => {
                setDisplayWait("none")
                setDisplay("inline")
                setIsScoring(false)
            }, 11000)
        }, 10500)
    }
    

    useEffect(() => {
        try {
            if (reservedSongs.length > 0) {
                const currentSong = (reservedSongs[0])
                setYoutubeID(currentSong.value.youtubeID.split('?')[0])
            } else {
                setYoutubeID('')
            }
        } catch (error) {
            console.log(error);
        }

    }, [reservedSongs])

    return (
        <div>
            {youtubeID ?
                (<YouTube
                    className="videoframe"
                    videoId={youtubeID}
                    opts={opts}
                    onReady={onReady}
                    onError={(error) => console.log(error)}
                    onEnd={onEnd}
                />
                ) : (
                    <div className="empty-container">
                        <h1 className="empty-song">Select a song</h1>
                    </div>
                )
            }


        </div>
    );
};

export default VideoFrame;
