import { useState } from 'react';
import { motion } from 'framer-motion';

const PhotoCard = ({ src, alt, caption, complimentsPool }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCompliment, setCurrentCompliment] = useState("");

    const handleFlip = () => {
        if (!isFlipped) {
            // Picking a new random compliment everytime it opens
            const random = complimentsPool[Math.floor(Math.random() * complimentsPool.length)];
            setCurrentCompliment(random);
        }
        setIsFlipped(!isFlipped);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleFlip}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100 cursor-pointer relative"
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                    <img src={src} alt={alt} className="w-full h-auto object-cover" />
                    <div className="p-4 bg-white">
                        <p className="text-gray-700 font-medium text-center font-serif">{caption}</p>
                        <p className="text-xs text-center text-pink-400 mt-2">(Tap for a surprise)</p>
                    </div>
                </div>

                {/* Back Side (Compliment) */}
                <div
                    className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-400 to-purple-600 text-white flex flex-col justify-center items-center p-6 text-center transform rotate-y-180 backface-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <h3 className="text-3xl font-script mb-4 text-pink-100">For You...</h3>
                    <p className="text-xl font-bold font-serif leading-relaxed drop-shadow-md">
                        "{currentCompliment}"
                    </p>
                </div>

                {/* Invisible image to maintain height/aspect ratio for Masonry */}
                <img src={src} alt={alt} className="w-full h-auto opacity-0 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

export default PhotoCard;
