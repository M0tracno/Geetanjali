import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Try to load song.mp3 from assets, fallback to the instrumental url
    const songModules = import.meta.glob('../assets/Images and Photos/*.mp3', { eager: true, query: '?url', import: 'default' });
    const localSong = Object.values(songModules)[0]; // Takes the first mp3 found
    const defaultSong = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    const songSrc = localSong || defaultSong;

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Autoplay blocked:", e));
        }
    }, []);

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-2xl flex items-center space-x-3 border border-pink-300"
        >
            <audio ref={audioRef} src={songSrc} loop autoPlay />

            <div className="flex flex-col pl-2 hidden sm:block">
                <span className="text-xs font-bold text-pink-600">
                    {localSong ? "❤️" : "Our Song"}
                </span>
            </div>

            <button
                onClick={togglePlay}
                className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors shadow-md animate-pulse hover:animate-none"
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
        </motion.div>
    );
};

export default MusicPlayer;
