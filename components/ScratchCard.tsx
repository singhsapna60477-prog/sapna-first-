import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';

interface ScratchCardProps {
  onComplete: () => void;
}

export default function ScratchCard({ onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FFA500');
    gradient.addColorStop(1, '#FF8C00');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH HERE', rect.width / 2, rect.height / 2);

    // Add pattern overlay
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        ctx.fillRect(i * 30, j * 30, 15, 15);
      }
    }
  }, []);

  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) {
        transparent++;
      }
    }

    return (transparent / (pixels.length / 4)) * 100;
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isComplete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2);
    ctx.fill();

    const percentage = calculateScratchPercentage();
    setScratchPercentage(percentage);

    if (percentage > 60 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleTouchStart = () => setIsScratching(true);
  const handleTouchEnd = () => setIsScratching(false);
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isScratching && e.touches[0]) {
      e.preventDefault();
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-block"
        >
          <Hand className="w-12 h-12 text-white mx-auto" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl text-white">
          Scratch to Reveal Your Prize!
        </h2>
        <p className="text-white/80 text-lg">
          Use your finger or mouse to scratch the card
        </p>
      </motion.div>

      {/* Scratch Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative"
      >
        {/* Card Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-yellow-300/50 mx-4 md:mx-0">
          {/* Background Prize Area */}
          <div className="relative aspect-[3/2] bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity 
              }}
              className="text-center space-y-4"
            >
              <div className="text-6xl md:text-8xl">🎁</div>
              <div className="text-2xl md:text-4xl text-white">
                Loading...
              </div>
            </motion.div>
          </div>

          {/* Scratch Canvas Overlay */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scratchPercentage > 10 ? 1 : 0 }}
          className="mt-4 text-center"
        >
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
            <span className="text-white">
              Scratched: {Math.round(scratchPercentage)}%
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-20 text-8xl">
        💰
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-20 text-8xl">
        💎
      </div>
    </div>
  );
}
