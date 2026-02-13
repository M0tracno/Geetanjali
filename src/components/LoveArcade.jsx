import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Gift, Music, Sun, Moon, Cloud } from 'lucide-react';
import Confetti from 'react-confetti';

const LoveArcade = () => {
    const [activeTab, setActiveTab] = useState('match');

    return (
        <section className="py-20 px-4 max-w-4xl mx-auto z-10 relative">
            <h2 className="text-5xl font-script text-center text-pink-600 mb-8">Love Arcade 🎮</h2>

            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => setActiveTab('match')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'match' ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-white text-pink-500 border border-pink-200 hover:bg-pink-50'}`}
                >
                    Memory Match
                </button>
                <button
                    onClick={() => setActiveTab('calc')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'calc' ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-white text-pink-500 border border-pink-200 hover:bg-pink-50'}`}
                >
                    Love Calculator
                </button>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-pink-100 min-h-[400px]">
                <AnimatePresence mode='wait'>
                    {activeTab === 'match' ? <MemoryMatch key="match" /> : <LoveCalculator key="calc" />}
                </AnimatePresence>
            </div>
        </section>
    );
};

const MemoryMatch = () => {
    const icons = [Heart, Star, Sparkles, Gift, Music, Sun, Moon, Cloud];
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [won, setWon] = useState(false);

    useEffect(() => {
        const gameIcons = [...icons, ...icons]
            .sort(() => Math.random() - 0.5)
            .map((Icon, id) => ({ id, Icon }));
        setCards(gameIcons);
    }, []);

    const handleFlip = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].Icon === cards[second].Icon) {
                setSolved([...solved, first, second]);
                setFlipped([]);
                if (solved.length + 2 === cards.length) setWon(true);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="text-center">
            {won && <Confetti numberOfPieces={200} recycle={false} />}
            <h3 className="text-2xl font-bold text-pink-600 mb-6">{won ? "You Won! 🎉" : "Find the matching pairs!"}</h3>

            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
                {cards.map(({ id, Icon }, index) => (
                    <motion.div
                        key={id}
                        className={`aspect-square cursor-pointer rounded-xl flex items-center justify-center text-3xl shadow-md transition-all ${flipped.includes(index) || solved.includes(index) ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-300'
                            }`}
                        onClick={() => handleFlip(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ rotateY: flipped.includes(index) || solved.includes(index) ? 180 : 0 }}
                    >
                        {(flipped.includes(index) || solved.includes(index)) && (
                            <motion.div style={{ rotateY: 180 }}>
                                <Icon size={28} />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
            {won && (
                <button
                    onClick={() => {
                        setWon(false);
                        setSolved([]);
                        setFlipped([]);
                        setCards([...icons, ...icons].sort(() => Math.random() - 0.5).map((Icon, id) => ({ id, Icon })));
                    }}
                    className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition"
                >
                    Play Again
                </button>
            )}
        </div>
    );
};

const LoveCalculator = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateLove = () => {
        if (!name1 || !name2) return;
        setLoading(true);
        setScore(null);

        // Fake calculation delay
        setTimeout(() => {
            setLoading(false);
            // Always high score for the user ;)
            const isUser = name1.toLowerCase().includes('geetanjali') || name2.toLowerCase().includes('geetanjali');
            const randomHigh = Math.floor(Math.random() * (100 - 90 + 1)) + 90;
            setScore(100 + Math.floor(Math.random() * 100)); // Always > 100%
        }, 1500);
    };

    return (
        <div className="text-center max-w-sm mx-auto">
            <h3 className="text-2xl font-bold text-pink-600 mb-6">Love Calculator 💘</h3>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="w-full p-3 rounded-xl border border-pink-200 focus:border-pink-500 focus:outline-none text-center"
                />
                <div className="text-pink-400 font-bold">+</div>
                <input
                    type="text"
                    placeholder="Partner's Name"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="w-full p-3 rounded-xl border border-pink-200 focus:border-pink-500 focus:outline-none text-center"
                />
            </div>

            <button
                onClick={calculateLove}
                disabled={loading || !name1 || !name2}
                className="mt-6 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
                {loading ? "Calculating..." : "Calculate Love %"}
            </button>

            {score !== null && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-8 p-6 bg-pink-50 rounded-2xl border border-pink-200"
                >
                    <div className="text-5xl font-bold text-pink-600 mb-2">{score}%</div>
                    <p className="text-gray-700 font-medium">
                        {score > 100 ? "Impossible! It's off the charts! 🤯💖" : "A perfect match! 💕"}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default LoveArcade;
