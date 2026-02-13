import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setTrail((prev) => [
                ...prev.slice(-15), // Keep last 15 points
                { x: e.clientX, y: e.clientY, id: Math.random() }
            ]);
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-pink-500 rounded-full bg-pink-200/30 backdrop-blur-sm"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 w-2 h-2 bg-pink-400 rounded-full"
                    style={{
                        left: point.x,
                        top: point.y
                    }}
                />
            ))}
        </div>
    );
};

export default CustomCursor;
