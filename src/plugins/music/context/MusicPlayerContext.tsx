import React, {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";

interface MusicPlayerContextInterface {
    volume:number,
    isPlaying: boolean,
    setVolume:Dispatch<SetStateAction<number>>
    setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export const MusicPlayerContext = createContext<MusicPlayerContextInterface>({} as MusicPlayerContextInterface)

export const MusicPlayerContextWrapper: React.FC<PropsWithChildren> = ({children}) =>{

    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)

    return <>
        <MusicPlayerContext.Provider value={{
            volume,
            isPlaying,
            setVolume,
            setIsPlaying
        }}>
            {children}
        </MusicPlayerContext.Provider>
    </>
}