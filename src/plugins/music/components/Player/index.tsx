import React, {useContext, useEffect, useState} from 'react'
import {pauseSong, playSong} from '../../utils/SongUtils'
import {Slider} from 'antd';
import {FeatureSong} from '@/constants/Interfaces'
import {secondsToMinutes} from '../../utils/commonUtils'
import {
    IoPause,
    IoPlay,
    IoPlaySkipBack,
    IoPlaySkipForward,
    IoVolumeHighOutline,
    IoVolumeMuteOutline
} from "react-icons/io5";
import Lyric from '../Lyrics'
import {MusicPlayerContext} from "../../context/MusicPlayerContext";

interface playerProps {
    song: FeatureSong,
}

interface isPlayingState {
    currentPlay: {
        isPlaying: boolean
    }
}

const Player: React.FC<playerProps> = props => {
    const {song} = props

    const {isPlaying, setIsPlaying, setVolume, volume:stateVolume} = useContext(MusicPlayerContext)

    // state for audio instance
    const [audioInstance, setAudioInstance] = useState<any>(null)
    const [playerVolume, setplayerVolume] = useState<number>(0)
    const [playerPosition, setPlayerPosition] = useState(0)
    const [firstPlay, setFirstPlay] = useState(true)
    const [showLyrics, setShowLyrics] = useState(false)

    useEffect(() => {
        createInstance()
    }, [song]) // eslint-disable-line


    // create instance
    const createInstance = () => {
        setPlayerPosition(0) // player position reset from song range slider
        const instance: any = document.getElementById('custom_song_src')
        setAudioInstance(instance)
        instance.volume = stateVolume
        setplayerVolume(stateVolume * 100) // set volum as pervious accoring to redux
        if (!firstPlay) {
            playSong(audioInstance)// auto play on click
            setIsPlaying(true)
            playSong(audioInstance)// auto play on click
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
            setFirstPlay(false)
        }
    }


// pause play song
    const pausePlaySong = () => {// the player button uses this button to play pause songswith in the player
        if (!isPlaying) {
            playSong(audioInstance)
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
            pauseSong(audioInstance)
        }
    }// the player button uses this button to play pause songswith in the player

    useEffect(() => {
        if (!isPlaying) pauseSong(audioInstance) // if player is pause/played from button located outside player
        else playSong(audioInstance)
    }, [isPlaying])//eslint-disable-line
    // end pause play song

    // volume setting
    const changeVolume = (value: any) => {
        // console.log(event)
        setplayerVolume(value)// to show the changes in volume to slider UI
        const vol = parseInt(value) / 100 //since volume ranges between 0 to 1 we get the value in between 0 and 1
        if(audioInstance){
            audioInstance.volume = vol // audio volume on live data
        }
        setVolume(vol)//update the redux with the changed volume
    }
    // end volume setting


    //song slider functions
    const setSongSlider = () => {
        if (isPlaying) {
            if (!isNaN(audioInstance.duration)) {
                const position = Math.floor(audioInstance.currentTime)
                setPlayerPosition(position)
                if (position === Math.floor(audioInstance.duration)) {
                    setIsPlaying(false)
                }
            }
        }
    }// this functions updates the slider on realtime to show the song being played

    useEffect(() => {// this functions updates the slider on realtime to show the song being played
        const songSlider = setInterval(setSongSlider, 1000)
        return () => clearInterval(songSlider)
    })// eslint-disable-line


    //used when song duration is changed drectly from the song slider
    const changeSongDuration = (value: number) => {
        setPlayerPosition(value)
        audioInstance.currentTime = audioInstance.duration * (value / audioInstance.duration)
    }
    //used when song duration is changed drectly from the song slider


    //toggle lyrics
    const ToggleLyrics = () => {
        setShowLyrics(!showLyrics)
    }
    // end toggle lyrics
    return (
        <>
            {audioInstance ? <Lyric lyric={song?.lyric} show={showLyrics} audioInstance={audioInstance}/> : ""}
            <div className="s-music-player">
                <div className="player-image">
                    <img src={song.cover_image || ''} alt=""/>
                </div>

                <div className="music-details">
                    <div className="song-title">
                        {song.title}
                    </div>
                    <div className=" song-range">
                        <div className="song-time">{
                            audioInstance ?
                                secondsToMinutes(audioInstance.currentTime) :
                                "0:00"
                        }</div>
                        <Slider
                            tipFormatter={(value: any) => {
                                if (audioInstance) {
                                    return secondsToMinutes(audioInstance.duration * (value / audioInstance.duration))
                                } else {
                                    return '0:00'
                                }
                            }}
                            value={playerPosition}
                            max={audioInstance?.duration}
                            min={0}
                            onChange={changeSongDuration}
                        />
                        <div className="song-time">{
                            audioInstance?.duration ?
                                secondsToMinutes(audioInstance.duration) :
                                "0:00"
                        }</div>
                    </div>
                </div>

                <div className="song-actions">
                    <p><IoPlaySkipBack/></p>
                    <audio src={song.url} id="custom_song_src"></audio>
                    <p onClick={pausePlaySong} className="custom_song_play_pause">
                        {isPlaying ? <IoPause/> : <IoPlay/>}</p>
                    <p><IoPlaySkipForward/></p>
                    <div className="player-sound">
                        {/* volume icon */}
                        {stateVolume === 0 ?
                            <IoVolumeMuteOutline onClick={() => changeVolume(10)}/> :
                            <IoVolumeHighOutline onClick={() => changeVolume(0)}/>
                        }
                        {/* volume icon */}
                        <Slider
                            tipFormatter={(value: any) => {
                                return <>{value + "%"}</>
                            }}
                            value={playerVolume}
                            max={100}
                            min={0}
                            onChange={changeVolume}/>
                    </div>
                    {/*<p title="Toggle Lyrics" className="ml-2" onClick={ToggleLyrics}><IoReaderSharp/></p>*/}
                </div>
            </div>
        </>
    )
}


export default Player;
