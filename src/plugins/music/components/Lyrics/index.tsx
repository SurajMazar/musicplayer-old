import React from 'react'
import {returnTimeFromLyric} from '../../utils/SongUtils'

interface lyricsProps {
    lyric?: string,
    audioInstance: any,
    show: boolean
}

interface lyric {
    time: number,
    lyric?: string,
}

const Lyrics: React.FC<lyricsProps> = props => {
    const {lyric, audioInstance, show} = props

    const [lyrics, SetLyrics] = React.useState([])
    const [currentLine, setCurrentLine] = React.useState("")

    React.useEffect(() => {
        let SongLyrics = lyric?.split("[");
        // console.log(SongLyrics)
        const converted: any = []
        SongLyrics?.forEach(l => {
            let ly = l.split("]")
            if (ly[0].match("(\\d{2}:\\d{2}\\.\\d{2})")) {
                let obj = {
                    time: returnTimeFromLyric(ly[0]),
                    lyric: ly[1]
                }
                converted.push(obj)
            }
        })
        SetLyrics(converted)
        // console.log(converted)
        setCurrentLine("...music...")
    }, [lyric]) //eslint-disable-line


    React.useEffect(() => {
        if (lyrics.length) {
            const currentTime = parseFloat((parseFloat(parseFloat(audioInstance.currentTime).toFixed(2)) * 100).toFixed(2))
            let CurrentLine: any = lyrics.find((lyric: lyric) => {
                return (lyric.time < (currentTime + 60)) && (lyric.time > (currentTime - 60))
            })
            if (CurrentLine) setCurrentLine(CurrentLine.lyric)
        }

        // console.log(audioInstance.currentTime)
    }, [audioInstance.currentTime]) //eslint-disable-line


    return (
        <>
            <p className="player-song-lyrics shadow-md">{currentLine || ''}</p>
        </>
    )
}


export default Lyrics
