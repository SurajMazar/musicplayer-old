import dynamic from "next/dynamic";
import {MusicPlayerContextWrapper} from "@/plugins/music/context/MusicPlayerContext";
import {useState} from "react";

const MusicPlayer = dynamic(
    () => import('@/plugins/music'),
    {ssr: false}
)
const ListSongs = dynamic(
    () => import('@/components/list'),
    {ssr: false}
)

export default function Home() {

    const [currentPlaying, setCurrentPlaying] = useState<{
        lyrics: string
        url: string
        thumbnail: string
        name: string
    } | null>(null)

    return (
        <main className={'min-h-screen bg-indigo-400'}>
            <div className="p-8 flex items-center justify-center">
                <div className={'w-full md:w-2/3 bg-white px-4'}>
                    <ListSongs onClick={setCurrentPlaying}/>
                </div>
            </div>
            <MusicPlayerContextWrapper>
                {
                    currentPlaying ?
                        <MusicPlayer song={{
                            lyric: currentPlaying?.lyrics,
                            url: currentPlaying?.url,
                            cover_image: currentPlaying?.thumbnail
                        }}/> : ''
                }
            </MusicPlayerContextWrapper>
        </main>
    );
}
