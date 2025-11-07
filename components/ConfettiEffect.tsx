import { motion } from 'framer-motion';

export default function ConfettiEffect() {
  const colors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
  const confettiCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: confettiCount }).map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 2;
        const randomRotation = Math.random() * 360;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = 8 + Math.random() * 8;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${randomX}%`,
              top: '-10%',
              width: randomSize,
              height: randomSize,
              backgroundColor: randomColor,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            initial={{ 
              y: -100, 
              x: 0, 
              opacity: 1,
              rotate: 0
            }}
            animate={{ 
              y: window.innerHeight + 100,
              x: (Math.random() - 0.5) * 200,
              opacity: [1, 1, 0],
              rotate: randomRotation * 3
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}
