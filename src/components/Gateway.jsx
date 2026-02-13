import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock } from 'lucide-react';
import Confetti from 'react-confetti';

const Gateway = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    // You can set this to a special date or word
    // For demo purposes, let's accept any non-empty string or a specific date like "22092017"
    const CORRECT_PASSWORD = "22092017";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsUnlocked(true);
            setTimeout(() => {
                onUnlock();
            }, 2000); // Wait for animation
        } else {
            setError(true);
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <AnimatePresence>
            {!isUnlocked && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                    transition={{ duration: 1.5 }}
                    className="fixed inset-0 z-[100] bg-black text-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="z-10 text-center max-w-md w-full"
                    >
                        <h1 className="text-4xl md:text-6xl font-script mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 animate-pulse">
                            Love Awaits...
                        </h1>

                        <p className="text-gray-400 mb-8 font-serif italic">Enter the day our story began (DDMM)</p>

                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="****"
                                className={`w-full bg-white/10 border-2 ${error ? 'border-red-500 shake' : 'border-pink-500/50'} rounded-full py-3 px-6 text-center text-xl tracking-[0.5em] text-white focus:outline-none focus:border-pink-400 transition-all placeholder-white/20`}
                                autoFocus
                            />

                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-pink-600 rounded-full text-white hover:bg-pink-500 transition-colors"
                            >
                                <Unlock size={20} />
                            </button>
                        </form>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 mt-4 text-sm"
                            >
                                Try "1402" or "love" ❤️
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>
            )}
            {isUnlocked && <Confetti numberOfPieces={200} recycle={false} />}
        </AnimatePresence>
    );
};

export default Gateway;
