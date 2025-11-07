import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, CheckCircle, Loader2, Gift, Users, Video, User } from 'lucide-react';
import { Button } from './ui/button';
import { CONFIG } from '../App';
import { UserDetails } from './UserDetailsForm';
import { toast } from 'sonner';

interface ClaimSectionProps {
  reward: { won: boolean; amount: number };
  userDetails: UserDetails;
  onReset: () => void;
}

export default function ClaimSection({ reward, userDetails, onReset }: ClaimSectionProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Simulate processing
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.inviteLink);
      setCopiedLink(true);
      toast.success('Invite link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CashBuds Rewards',
        text: CONFIG.shareText,
        url: CONFIG.inviteLink
      }).catch(() => {
        handleCopyLink();
      });
    } else {
      handleCopyLink();
    }
  };

  if (!reward.won) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md border-2 border-white/20"
        >
          <div className="text-6xl">😔</div>
          <h2 className="text-2xl text-white">
            No Reward This Time
          </h2>
          <p className="text-white/80">
            Come back tomorrow for another chance to win!
          </p>
          <Button
            onClick={() => window.location.href = CONFIG.telegramLink}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            Join Telegram for Updates
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity 
            }}
            className="inline-block text-6xl md:text-8xl mb-4"
          >
            🎁
          </motion.div>
          <h1 className="text-3xl md:text-5xl text-white mb-2">
            Claim Your Reward
          </h1>
          <div className="text-4xl md:text-6xl text-yellow-300">
            ₹{reward.amount}
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              // Processing State
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 text-center space-y-6 bg-gradient-to-br from-blue-50 to-purple-50"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-16 h-16 text-blue-600 mx-auto" />
                </motion.div>
                <h3 className="text-2xl text-gray-900">
                  Processing Your Reward...
                </h3>
                <p className="text-gray-600">
                  Please wait while we verify your entry
                </p>
                <motion.div 
                  className="flex justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-blue-600 rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              // Unlock Instructions
              <motion.div
                key="unlock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 space-y-6"
              >
                <AnimatePresence mode="wait">
                  {!showFinalMessage ? (
                    <motion.div
                      key="steps"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <Gift className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                        <h3 className="text-2xl text-gray-900 mb-2">
                          Almost There!
                        </h3>
                        <p className="text-gray-600">
                          Complete these simple steps to unlock your reward
                        </p>
                      </div>

                      {/* Steps */}
                      <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
                          <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-gray-900">
                              Step 1: Join Telegram ✅
                            </h4>
                            <p className="text-sm text-gray-600">
                              You've already joined our channel!
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
                          <Users className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-3">
                              Step 2: Share with 3 Friends
                            </h4>
                            <div className="space-y-2">
                              <Button
                                onClick={handleCopyLink}
                                variant="outline"
                                className="w-full"
                              >
                                {copiedLink ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                    Link Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Invite Link
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={handleShare}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Now
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Step 3 (Optional) */}
                        <div className="flex items-start gap-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
                          <Video className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-2">
                              Step 3: Watch Ad (Optional)
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Watch a short ad to unlock instantly
                            </p>
                            <Button
                              variant="outline"
                              className="w-full"
                              disabled
                            >
                              Watch Ad to Unlock
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Final Message
                    <motion.div
                      key="final"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-8"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 1,
                          times: [0, 0.5, 1]
                        }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-2xl">
                          🎉
                        </div>
                      </motion.div>

                      <h3 className="text-3xl text-gray-900">
                        Reward Confirmed!
                      </h3>
                      
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl">
                        <div className="text-5xl mb-2">
                          ₹{reward.amount}
                        </div>
                        <p className="text-sm">
                          Will be transferred to your UPI ID within 24-48 hours
                        </p>
                      </div>

                      {/* User Details Confirmation */}
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-left">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-5 h-5 text-gray-600" />
                          <h4 className="text-gray-900">Payment Details</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="text-gray-900">{userDetails.fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-900">{userDetails.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="text-gray-900">+91 {userDetails.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">UPI ID:</span>
                            <span className="text-gray-900 break-all">{userDetails.upiId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                        <p className="text-sm text-gray-700">
                          ✅ <strong>Success!</strong> You'll receive a confirmation email at {userDetails.email} once the payment is processed.
                        </p>
                      </div>

                      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                        <p className="text-xs text-gray-700">
                          📱 We may contact you on {userDetails.phone} for verification purposes
                        </p>
                      </div>

                      <Button
                        onClick={onReset}
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      >
                        visit site again
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6"
        >
          <p className="text-white/90 text-sm text-center">
            💡 <strong>Pro Tip:</strong> Share with more friends to increase your chances of winning bigger rewards tomorrow!
          </p>
        </motion.div>
      </div>
    </div>
  );
}