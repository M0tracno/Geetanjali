import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const cards = [
    {
        id: 1,
        title: "Open When You Miss Me",
        content: "Remember that I am always with you in spirit. Close your eyes, take a deep breath, and feel my love wrapping around you. Distance means so little when someone means so much.",
        color: "bg-blue-100"
    },
    {
        id: 2,
        title: "Open When You Are Sad",
        content: "I hate seeing you sad. Please smile for me? You have the most beautiful smile in the world. Remember all our happy moments and know that good times are always waiting for us.",
        color: "bg-purple-100"
    },
    {
        id: 3,
        title: "Open When You Need a Hug",
        content: "*Sending virtual bear hug* 🐻🤗 squeeze your pillow tight and imagine it's me! I can't wait to hold you in my arms again.",
        color: "bg-yellow-100"
    },
    {
        id: 4,
        title: "Open When You Are Happy",
        content: "Yay! I am so happy that you are happy! Your joy is my joy. Keep shining, my love! ✨",
        color: "bg-green-100"
    }
];

const OpenWhenCards = ({ onOpen }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        if (onOpen) onOpen();
    };

    return (
        <div className="py-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-5xl font-script text-center text-pink-600 mb-16">Open When...</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCardClick(card)}
                        className={`cursor-pointer h-48 rounded-xl shadow-lg flex items-center justify-center p-6 text-center border-2 border-dashed border-gray-300 relative overflow-hidden group ${card.color}`}
                    >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <h3 className="text-xl font-serif text-gray-700 font-bold max-w-xs">{card.title}</h3>
                        <div className="absolute -bottom-4 -right-4 text-6xl text-pink-200 opacity-50 transform rotate-12">✉️</div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedCard(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 100 }}
                            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-3xl font-script text-pink-600 mb-6 border-b pb-2">{selectedCard.title}</h3>
                            <p className="text-lg text-gray-700 leading-relaxed font-handwriting italic">{selectedCard.content}</p>

                            <div className="mt-8 text-right">
                                <span className="text-pink-400 text-sm">With Love, Always</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OpenWhenCards;
