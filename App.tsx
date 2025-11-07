import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/sonner';
import Hero from './components/Hero';
import ScratchCard from './components/ScratchCard';
import RewardModal from './components/RewardModal';
import ClaimSection from './components/ClaimSection';
import UserDetailsForm, { UserDetails } from './components/UserDetailsForm';
import Footer from './components/Footer';
import ConfettiEffect from './components/ConfettiEffect';
import AdSpace from './components/AdSpace';

// Editable Config
export const CONFIG = {
  telegramLink: 'https://t.me/+rjlf_KSaNR4zNmU1',
  winningRatio: 0.7, // 70% chance to win
  minReward: 10,
  maxReward: 500,
  shareText: 'Join CashBuds and scratch to win rewards! 🎁',
  inviteLink: 'https://cashbuds-rewards.com/invite/USER123'
};

export default function App() {
  const [showScratch, setShowScratch] = useState(false);
  const [reward, setReward] = useState<{ won: boolean; amount: number } | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showClaimSection, setShowClaimSection] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    // Check if user already scratched today
    const lastScratch = localStorage.getItem('lastScratchDate');
    const today = new Date().toDateString();
    
    // Check for saved user details
    const savedDetails = localStorage.getItem('userDetails');
    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }
    
    if (lastScratch === today) {
      const savedReward = localStorage.getItem('todayReward');
      if (savedReward) {
        const parsed = JSON.parse(savedReward);
        setReward(parsed);
        setShowClaimSection(true);
      }
    }
  }, []);

  const handleStartScratch = () => {
    setShowScratch(true);
  };

  const handleScratchComplete = () => {
    // Generate reward
    const won = Math.random() < CONFIG.winningRatio;
    const amount = won 
      ? Math.floor(Math.random() * (CONFIG.maxReward - CONFIG.minReward + 1)) + CONFIG.minReward
      : 0;
    
    const rewardData = { won, amount };
    setReward(rewardData);
    
    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem('lastScratchDate', today);
    localStorage.setItem('todayReward', JSON.stringify(rewardData));
    
    // Show modal after slight delay
    setTimeout(() => {
      setShowRewardModal(true);
      if (won) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 500);
  };

  const handleCloseModal = () => {
    setShowRewardModal(false);
    if (reward?.won) {
      // Show user details form if not already filled
      if (!userDetails) {
        setShowUserForm(true);
      } else {
        setShowClaimSection(true);
      }
    } else {
      setShowScratch(false);
    }
  };

  const handleUserDetailsComplete = (details: UserDetails) => {
    setUserDetails(details);
    setShowUserForm(false);
    setShowClaimSection(true);
  };

  const handleReset = () => {
    localStorage.removeItem('lastScratchDate');
    localStorage.removeItem('todayReward');
    setReward(null);
    setShowScratch(false);
    setShowClaimSection(false);
    setShowRewardModal(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 animate-gradient -z-10" />
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <ConfettiEffect />}
      </AnimatePresence>

      {/* Top Ad Space */}
      <AdSpace position="top" />

      <main className="relative z-10">
        {!showScratch && !showClaimSection && !showUserForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onStart={handleStartScratch} />
          </motion.div>
        )}

        {showScratch && !showClaimSection && !showUserForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="container mx-auto px-4 py-12"
          >
            <ScratchCard onComplete={handleScratchComplete} />
          </motion.div>
        )}

        {showUserForm && reward?.won && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UserDetailsForm onComplete={handleUserDetailsComplete} />
          </motion.div>
        )}

        {showClaimSection && reward && userDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ClaimSection reward={reward} userDetails={userDetails} onReset={handleReset} />
          </motion.div>
        )}

        {/* Middle Ad Space */}
        <AdSpace position="middle" />
      </main>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && reward && (
          <RewardModal
            reward={reward}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {/* Bottom Ad Space */}
      <AdSpace position="bottom" />

      <Footer />
    </div>
  );
}