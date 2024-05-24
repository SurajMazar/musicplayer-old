export const playSong = (instance:any) =>{
  if(instance)  instance.play()
}

export const pauseSong = (instance:any) =>{
  if(instance) instance.pause()
}

export const setVolume = (instance:any,vol:any) =>{
  if(instance) instance.volume(vol)
}

export const returnTimeFromLyric = (lrcTime:string)=>{
  let min = parseFloat(lrcTime.split(':')[0])
  let sec = parseFloat(parseFloat((lrcTime.split(':')[1])).toFixed(2))
  return parseFloat(((min*60+sec) * 100).toFixed(2));
}