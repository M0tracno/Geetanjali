import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RelationshipClock = ({ startDate = "2017-09-22" }) => {
    const [time, setTime] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const start = new Date(startDate).getTime();

        const updateClock = () => {
            const now = new Date().getTime();
            const difference = now - start;

            const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTime({ years, days, hours, minutes, seconds });
        };

        const timer = setInterval(updateClock, 1000);
        updateClock(); // Initial call

        return () => clearInterval(timer);
    }, [startDate]);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center mx-1 md:mx-4">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-4 shadow-lg min-w-[60px] md:min-w-[90px] text-center border border-pink-200/30">
                <span className="text-xl md:text-4xl font-bold text-white drop-shadow-md font-mono">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-pink-100 text-[10px] md:text-sm mt-1 md:mt-2 font-medium tracking-wider uppercase">{label}</span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center items-center py-10 z-20 relative"
        >
            <TimeUnit value={time.years} label="Years" />
            <TimeUnit value={time.days} label="Days" />
            <TimeUnit value={time.hours} label="Hours" />
            <TimeUnit value={time.minutes} label="Mins" />
            <TimeUnit value={time.seconds} label="Secs" />
        </motion.div>
    );
};

export default RelationshipClock;
