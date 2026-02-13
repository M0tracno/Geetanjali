import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import HeartAnimation from './components/HeartAnimation';
import PhotoCard from './components/PhotoCard';
import VideoSection from './components/VideoSection';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';
import OpenWhenCards from './components/OpenWhenCards';
import Quiz from './components/Quiz.jsx';
import LoveArcade from './components/LoveArcade';
import Gateway from './components/Gateway';
import GlassHeart from './components/GlassHeart';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import Timeline from './components/Timeline';
import RelationshipClock from './components/RelationshipClock';
import { motion, useScroll, useTransform } from 'framer-motion';
import Confetti from 'react-confetti';
// We might need to install react-use or just use window.innerWidth

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Dynamically import all images
  const imageModules = import.meta.glob('./assets/Images and Photos/*.{jpeg,jpg,png}', { eager: true, query: '?url', import: 'default' });

  const compliments = [
    "Your smile lights up my darkest days.",
    "You have the most beautiful soul I've ever known.",
    "Every moment with you is a treasure.",
    "You are my favorite thought.",
    "Loving you is the easiest thing I've ever done.",
    "You make my heart skip a beat.",
    "You are my sunshine.",
    "Your laugh is my favorite sound.",
    "You are perfectly imperfect.",
    "I fall for you more every single day."
  ];

  const photos = Object.values(imageModules).map((src, index) => ({
    id: index,
    src: src,
    caption: `Memory ${index + 1}`,
    complimentsPool: compliments
  }));

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSurprise = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 overflow-x-hidden relative">

      {/* Gateway - Locks the app until password is entered */}
      <Gateway onUnlock={() => setIsUnlocked(true)} />

      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CustomCursor />
          {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Hero Section with 3D Heart */}
          <header className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black via-gray-900 to-pink-900 text-white relative overflow-hidden">

            <ParticleBackground />

            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <Suspense fallback={null}>
                  <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <GlassHeart position={[0, 0, 0]} />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
              </Canvas>
            </div>

            <motion.div style={{ scale }} className="z-10 relative pointer-events-none">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6 font-script drop-shadow-lg"
              >
                Kuchu
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-xl md:text-3xl text-pink-200 italic font-light tracking-widest px-4"
              >
                My Universe, My Everything
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="absolute bottom-10 animate-bounce text-pink-300 z-10"
            >
              <span className="text-sm">Explore Our World</span>
              <br />
              ↓
            </motion.div>
          </header>

          {/* Relationship Clock Section */}
          <section className="py-10 bg-gradient-to-b from-gray-900 to-pink-900 text-white">
            <h2 className="text-3xl font-script text-center text-pink-200 mb-8">Time Since We Slayed Existence</h2>
            <RelationshipClock />
          </section>

          {/* Timeline Section */}
          <Timeline />

          {/* Gallery Section - Masonry Layout */}
          <section className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
            <h2 className="text-5xl font-script text-center text-pink-600 mb-16">The Most Beautiful Girl in the World</h2>

            {photos.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {photos.map((photo, index) => (
                  <div key={photo.id} className="break-inside-avoid">
                    <PhotoCard src={photo.src} alt={photo.caption} caption={photo.caption} complimentsPool={photo.complimentsPool} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No photos found. Please add photos to the assets folder.</p>
            )}
          </section>

          {/* Quiz Section */}
          <Quiz />

          {/* Love Arcade - Mini Games */}
          <LoveArcade />

          {/* Video Section */}
          <VideoSection />

          {/* Open When Cards */}
          <OpenWhenCards onOpen={handleSurprise} />

          {/* Letter Section */}
          <Letter />

          {/* Footer */}
          <footer className="bg-pink-100 py-10 text-center text-pink-500 font-medium relative z-10">
            <p className="mb-2">Created with all my love and a little bit of magic ✨</p>
            <p className="text-sm text-pink-400">Forever Yours Babyyyyyyyy</p>
          </footer>

          {/* Music Player */}
          <MusicPlayer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
