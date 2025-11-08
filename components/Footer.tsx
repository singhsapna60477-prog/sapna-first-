import { motion } from 'framer-motion';
import { Send, Instagram, Youtube, Heart } from 'lucide-react';
import { CONFIG } from '../App';

export default function Footer() {
  const socialLinks = [
    { 
      icon: Send, 
      label: 'Telegram', 
      url: CONFIG.telegramLink,
      color: 'hover:text-blue-400' 
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      url: 'https://www.instagram.com/mr.promoter.yash?igsh=MWowcDhkZGJrczRx',
      color: 'hover:text-pink-400' 
    },
    { 
      icon: Youtube, 
      label: 'YouTube', 
      // Placeholder / provided by user
      url: '#',
      color: 'hover:text-red-400' 
    },
  ];

  return (
    <footer className="relative mt-16 pb-8">
      {/* Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-20 z-50 hidden md:block"
      >
        <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <p className="text-white/70 text-xs">
            Yash Prajapati • Developer
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">💰</span>
                <h3 className="text-xl text-white">
                  CashBuds
                </h3>
              </div>
              <p className="text-white/70 text-sm">
                Play, Scratch, and Earn rewards! Join thousands of happy winners.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-white">Connect With Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/30 text-white transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-white">Legal</h4>
              <div className="space-y-2 text-sm">
                <p className="text-white/70">
                  Terms & Conditions
                </p>
                <p className="text-white/70">
                  Privacy Policy
                </p>
                <p className="text-white/70">
                  Refund Policy
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-white/20" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/70 text-sm">
              © 2025 CashBuds. All rights reserved.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-white/70 text-sm"
            >
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              </motion.div>
              <span>by</span>
              <span className="text-white font-medium">Yash Prajapati</span>
            </motion.div>
          </div>

          {/* SEO Keywords (hidden) */}
          <div className="hidden">
            cashbuds rewards, scratch win demo, telegram promo, scratch card game, 
            rewards portal, yash prajapati developer, instant rewards, daily scratch, 
            win cash online, free rewards portal
          </div>
        </div>
      </div>
    </footer>
  );
}