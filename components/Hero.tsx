import { motion } from 'framer-motion';
import { Sparkles, Gift, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-3xl"
      >
        {/* Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="inline-block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-50 animate-pulse" />
            <h1 className="relative text-6xl md:text-8xl text-white drop-shadow-2xl tracking-tight">
              💰 CashBuds
            </h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-5xl text-white">
            Play • Scratch • Earn
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Scratch your luck and win instant rewards! 
            Join thousands of winners today.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {[
            { icon: Sparkles, text: 'Instant Wins' },
            { icon: Gift, text: 'Daily Rewards' },
            { icon: Zap, text: 'Easy Claims' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30"
            >
              <feature.icon className="w-5 h-5 text-yellow-300" />
              <span className="text-white">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="relative group text-xl md:text-2xl px-12 py-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 border-4 border-yellow-300/50 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Scratch & Win Now!
              <Sparkles className="w-6 h-6" />
            </span>
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-white/70 max-w-xl mx-auto"
        >
          🎉 One scratch per day | Win up to ₹500 | Instant UPI transfer
        </motion.p>
      </motion.div>
    </div>
  );
}