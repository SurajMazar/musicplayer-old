import React from 'react'
import Player from './components/Player'
import {FeatureSong} from '@/constants/Interfaces'

interface propsTypes{
  song:FeatureSong
}

const MusicPlayer:React.FC<propsTypes> = props =>{

  const {song} = props


  return(
    <>
      <Player song={song}/>
    </>
  )
}

export default MusicPlayer
