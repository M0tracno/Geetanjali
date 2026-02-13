import { motion } from 'framer-motion';

const Letter = () => {
    const text = `Mo Guduli,

Writing this to tell you how much you mean to me. Every moment with you is a treasure.
You light up my world in ways I never imagined possible.

Happy Valentine's Day, my love!

Forever yours,
Karan`;

    const sentenceVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.03, // Speed of typing
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <div className="py-20 px-4 bg-pink-50">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={letterVariants}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl relative overflow-hidden"
                style={{ backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)', backgroundSize: '100% 2em' }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-bl-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-100 rounded-tr-full opacity-50" />

                <motion.div variants={sentenceVariants}>
                    <h2 className="text-4xl font-script text-pink-600 mb-8 text-center drop-shadow-sm" style={{ fontFamily: 'Dancing Script, cursive' }}>
                        My Dearest...
                    </h2>

                    <p className="text-xl leading-loose font-handwriting text-gray-800 italic whitespace-pre-wrap">
                        {text.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Letter;
