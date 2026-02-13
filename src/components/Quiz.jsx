import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const questions = [
    {
        question: "Where did we first meet?",
        options: ["School/College", "Coffee Shop", "Online", "Through Friends"],
        correct: 0,
    },
    {
        question: "What is my favorite nickname for you?",
        options: ["Kuchu", "Kuchudu", "Baby", "Dhaana"],
        correct: "all", // Special flag
    },
    {
        question: "What is our song?",
        options: ["Humsafar", "Perfect", "Tum Hi Ho", "Raabta"],
        correct: 0,
    },
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [customName, setCustomName] = useState("");
    const [extraOptions, setExtraOptions] = useState([]);

    useEffect(() => {
        const savedNames = localStorage.getItem('customNicknames');
        if (savedNames) {
            setExtraOptions(JSON.parse(savedNames));
        }
    }, []);

    const handleAnswer = (index) => {
        const isCorrect = questions[currentQuestion].correct === "all" || index === questions[currentQuestion].correct;

        if (isCorrect) {
            setScore(score + 1);
            setConfetti(true);
            setTimeout(() => setConfetti(false), 2000);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setTimeout(() => setCurrentQuestion(nextQuestion), 1000);
        } else {
            setTimeout(() => setShowResult(true), 1000);
        }
    };

    const handleAddName = (e) => {
        e.preventDefault();
        if (customName.trim()) {
            const newOptions = [...extraOptions, customName.trim()];
            setExtraOptions(newOptions);
            localStorage.setItem('customNicknames', JSON.stringify(newOptions));
            setCustomName("");
            // Auto-select the new name as correct
            setScore(score + 1);
            setConfetti(true);
            setTimeout(() => setConfetti(false), 2000);
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setTimeout(() => setCurrentQuestion(nextQuestion), 1000);
            } else {
                setTimeout(() => setShowResult(true), 1000);
            }
        }
    };

    const currentOptions = currentQuestion === 1
        ? [...questions[currentQuestion].options, ...extraOptions]
        : questions[currentQuestion].options;

    return (
        <div className="py-20 px-4 max-w-4xl mx-auto text-center relative">
            {confetti && <Confetti numberOfPieces={200} recycle={false} />}

            <h2 className="text-4xl font-script text-pink-600 mb-12">How well do you know us?</h2>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-pink-200">
                {!showResult ? (
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQuestion}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                        >
                            <h3 className="text-2xl font-serif text-gray-800 mb-8">{questions[currentQuestion].question}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentOptions.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05, backgroundColor: "#fce7f3" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAnswer(index)}
                                        className="p-4 bg-white border-2 border-pink-100 rounded-xl text-lg text-gray-700 font-medium hover:border-pink-300 transition-colors shadow-sm"
                                    >
                                        {option}
                                    </motion.button>
                                ))}
                            </div>

                            {currentQuestion === 1 && (
                                <form onSubmit={handleAddName} className="mt-6 flex gap-2 justify-center">
                                    <input
                                        type="text"
                                        value={customName}
                                        onChange={(e) => setCustomName(e.target.value)}
                                        placeholder="Add a new nickname..."
                                        className="p-2 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-500"
                                    />
                                    <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold">Add</button>
                                </form>
                            )}

                            <div className="mt-8 text-sm text-gray-400">
                                Question {currentQuestion + 1} of {questions.length}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <h3 className="text-4xl font-bold text-pink-600 mb-4">
                            {score === questions.length ? "Perfect Score! ❤️" : "Good Job! 😉"}
                        </h3>
                        {/* Only show "Soulmate" if actually fully correct, though logic ensures high score mostly */}
                        <p className="text-lg text-pink-500 animate-bounce">
                            You truly are my soulmate! 💑
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
