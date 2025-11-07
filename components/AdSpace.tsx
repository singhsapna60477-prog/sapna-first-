import { motion } from 'framer-motion';

interface AdSpaceProps {
  position: 'top' | 'middle' | 'bottom';
}

export default function AdSpace({ position }: AdSpaceProps) {
  const heights = {
    top: 'h-24',
    middle: 'h-32',
    bottom: 'h-28'
  };

  const margins = {
    top: 'mb-0',
    middle: 'my-8',
    bottom: 'mt-0'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`${heights[position]} ${margins[position]} bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center`}
    >
      <div className="ad-space w-full h-full flex items-center justify-center">
        <div className="text-center space-y-1">
          <p className="text-white/60 text-sm">Advertisement Space</p>
          <p className="text-white/40 text-xs">
            {position.charAt(0).toUpperCase() + position.slice(1)} Banner - 
            Place your ad code here
          </p>
        </div>
      </div>
    </motion.div>
  );
}
