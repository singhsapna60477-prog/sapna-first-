import { motion } from 'framer-motion';
import { X, Trophy, Frown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { CONFIG } from '../App';

interface RewardModalProps {
  reward: { won: boolean; amount: number };
  onClose: () => void;
}

export default function RewardModal({ reward, onClose }: RewardModalProps) {
  const handleTelegramClick = () => {
    window.open(CONFIG.telegramLink, '_blank');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, rotateY: 90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, rotateY: -90 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {reward.won ? (
          // Winner Modal
          <div className="p-8 text-center space-y-6 bg-gradient-to-br from-yellow-50 to-orange-50">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 0.6,
                repeat: 3
              }}
            >
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-3xl text-gray-900">
                🎉 Congratulations!
              </h3>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                  ₹{reward.amount}
                </div>
              </motion.div>
              <p className="text-gray-600">
                You've won an amazing reward!
              </p>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-4">
              <p className="text-sm text-gray-700">
                🔐 To unlock your reward, join our Telegram channel and share with friends!
              </p>
            </div>

            <Button
              onClick={handleTelegramClick}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Join Telegram Channel
            </Button>

            <p className="text-xs text-gray-500">
              After joining, click "Continue" to claim your reward
            </p>
          </div>
        ) : (
          // Try Again Modal
          <div className="p-8 text-center space-y-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0]
              }}
              transition={{ 
                duration: 0.5,
                repeat: 2
              }}
            >
              <Frown className="w-20 h-20 text-gray-400 mx-auto" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-3xl text-gray-900">
                Better Luck Next Time!
              </h3>
              <p className="text-gray-600">
                Don't worry, you can try again tomorrow!
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
              <p className="text-sm text-gray-700">
                💡 Join our Telegram channel to get notified when new chances are available!
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleTelegramClick}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Join Telegram for Updates
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
