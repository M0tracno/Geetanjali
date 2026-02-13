import { motion } from 'framer-motion';
import { Heart, Star, Music, Camera } from 'lucide-react';

const milestones = [
    {
        date: "September 22, 2017",
        title: "The Beginning",
        description: "The day our universe began. The magic started here.",
        icon: <Heart className="w-6 h-6 text-white" />
    },
    {
        date: "Special Date",
        title: "First I Love You",
        description: "Three words that changed everything forever.",
        icon: <Star className="w-6 h-6 text-white" />
    },
    {
        date: "Memorable Moment",
        title: "Countless Adventures",
        description: "From late night talks to endless laughter.",
        icon: <Camera className="w-6 h-6 text-white" />
    },
    {
        date: "Today",
        title: "Still Falling",
        description: "Falling in love with you, over and over again.",
        icon: <Music className="w-6 h-6 text-white" />
    }
];

const Timeline = () => {
    return (
        <div className="py-20 px-4 max-w-4xl mx-auto relative">
            <h2 className="text-5xl font-script text-center text-pink-600 mb-16">Our Journey</h2>

            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-200 via-pink-400 to-purple-500 rounded-full opacity-30" />

            <div className="space-y-12">
                {milestones.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}
                    >
                        {/* Content Box */}
                        <div className="w-full md:w-5/12 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-pink-100 hover:shadow-2xl transition-shadow duration-300 z-10 mb-6 md:mb-0">
                            <h3 className="text-xl font-bold text-pink-600 font-serif mb-1">{item.title}</h3>
                            <p className="text-sm text-purple-400 font-medium mb-2">{item.date}</p>
                            <p className="text-gray-600 font-handwriting text-lg leading-relaxed">{item.description}</p>
                        </div>

                        {/* Icon Node */}
                        <div className="z-10 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 border-4 border-white my-4 md:my-0">
                            {item.icon}
                        </div>

                        {/* Spacer for alignment */}
                        <div className="hidden md:block w-5/12" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
