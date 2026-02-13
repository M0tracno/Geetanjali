import videoUrl from '../assets/Images and Photos/romance.mp4';

const VideoSection = () => {
    return (
        <div className="py-20 bg-white">
            <h2 className="text-4xl font-script text-center text-pink-600 mb-12">Our Beautiful Moments</h2>
            <div className="max-w-5xl mx-auto px-4">
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-200">
                    <video
                        controls
                        className="w-full h-full object-cover"
                        src={videoUrl}
                        poster="https://images.unsplash.com/photo-1518199266791-5375a83190b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    />
                </div>
                <p className="text-center text-gray-500 mt-4 italic font-medium">Click play to watch our journey</p>
            </div>
        </div>
    );
};

export default VideoSection;
