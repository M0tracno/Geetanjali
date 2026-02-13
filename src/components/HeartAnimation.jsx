import { motion } from 'framer-motion';

const HeartAnimation = () => {
    return (
        <div className="flex justify-center items-center py-10">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="#ef4444"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-lg"
                >
                    <path d="M19 14c1.49-1.28 3.6-2.55 3.67-5.36C22.73 5.43 20.25 3 17.38 3 14.86 3 13.08 4.7 12 5.67 10.92 4.7 9.14 3 6.62 3 3.75 3 1.27 5.43 1.33 8.64c.07 2.81 2.18 4.08 3.67 5.36L12 21l7-7Z" />
                </svg>
            </motion.div>
        </div>
    );
};

export default HeartAnimation;
