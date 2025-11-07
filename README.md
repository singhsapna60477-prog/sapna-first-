# 💰 CashBuds Rewards – Play • Scratch • Earn

A fully responsive, animated, and dynamic scratch card rewards website built with React, TypeScript, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Dynamic Scratch Card System
- HTML5 Canvas-based scratch effect
- Touch and mouse support
- Real-time scratch percentage tracking
- Randomized reward system with configurable win rates

### ⚡ Reward Flow
- Animated popup modals for win/lose states
- Telegram channel integration (configurable)
- Multi-step claim process with social sharing
- localStorage persistence (prevents multiple daily scratches)

### 💸 Claim Process
- Animated loading states
- Copy-to-clipboard functionality
- Social sharing integration (Web Share API)
- "Watch Ad to Unlock" placeholder
- Progressive reward unlock flow

### 🎭 Animations & Effects
- Confetti burst on wins
- Smooth entrance animations using Motion (Framer Motion)
- Gradient background animations
- 3D card flip effects
- Hover and tap animations

### 📱 Responsive Design
- 100% mobile-friendly
- Optimized for touch input
- Works on all devices (phones, tablets, desktops)
- Responsive typography and spacing

### 💰 Monetization Ready
- AdSense-friendly structure
- Ad space placeholders (top, middle, bottom)
- Clean HTML structure
- No prohibited content
- Compliant with advertising policies

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion/React (Framer Motion)
- **Icons**: Lucide React
- **UI Components**: Shadcn/UI
- **Notifications**: Sonner
- **Storage**: localStorage

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cashbuds-rewards.git

# Navigate to project directory
cd cashbuds-rewards

# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Configuration

All editable settings are located in `/App.tsx`:

```typescript
export const CONFIG = {
  telegramLink: 'https://t.me/yourchannel',
  winningRatio: 0.7, // 70% chance to win
  minReward: 10,
  maxReward: 500,
  shareText: 'Join CashBuds and scratch to win rewards! 🎁',
  inviteLink: 'https://cashbuds-rewards.com/invite/USER123'
};
```

### Customizable Options:

- **telegramLink**: Your Telegram channel URL
- **winningRatio**: Probability of winning (0-1, where 0.7 = 70%)
- **minReward**: Minimum reward amount
- **maxReward**: Maximum reward amount
- **shareText**: Default sharing message
- **inviteLink**: Your referral/invite link

## 📁 Project Structure

```
/
├── App.tsx                 # Main application component
├── components/
│   ├── Hero.tsx           # Landing page hero section
│   ├── ScratchCard.tsx    # Canvas-based scratch card
│   ├── RewardModal.tsx    # Win/lose modal popup
│   ├── ClaimSection.tsx   # Reward claim flow
│   ├── ConfettiEffect.tsx # Confetti animation
│   ├── AdSpace.tsx        # Ad placeholder component
│   ├── Footer.tsx         # Footer with social links
│   └── ui/                # Shadcn UI components
├── styles/
│   └── globals.css        # Global styles & animations
└── index.html            # SEO-optimized HTML
```

## 🎯 Key Components

### ScratchCard
Interactive canvas-based scratch card with touch and mouse support.

### RewardModal
Animated modal showing win/lose states with Telegram integration.

### ClaimSection
Multi-step process for claiming rewards:
1. Join Telegram channel ✅
2. Share with 3 friends
3. Watch ad (optional)

### ConfettiEffect
Particle-based confetti animation on wins.

## 🔐 Safety & Compliance

- ⚠️ Includes disclaimer: "This site is for entertainment and demo purposes only. No real money is involved."
- SSL-compatible
- Ad-friendly content
- No gambling mechanics
- No misleading financial claims
- Complies with Google AdSense policies

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 📊 SEO Optimization

- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- Fast loading (Core Web Vitals optimized)

**Keywords**: cashbuds rewards, scratch win demo, telegram promo, scratch card game, rewards portal, instant rewards, daily scratch

## 🎨 Design Style

- **Colors**: Golden yellow → Orange gradient
- **Fonts**: 
  - Headings: Poppins (Bold)
  - Body: Inter
- **Effects**: 3D glossy cards, soft shadows, glow effects
- **Animation**: Smooth transitions, gradient animations

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## 🔧 Development

### Reset Demo Data

Click the "Reset Demo" button (bottom-right) to clear localStorage and test again.

### Adding Ad Scripts

Replace `<div class="ad-space"></div>` in `AdSpace.tsx` with your ad code:

```tsx
<div className="ad-space">
  {/* Your AdSense/ad network code here */}
</div>
```

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 👨‍💻 Developer

**Yash Prajapati**
- Role: Full Stack Developer
- Website: [Your Website]
- Email: [Your Email]
- GitHub: [@yourhandle]

---

## 🎁 Bonus Features (Coming Soon)

- [ ] Sound effects on scratch completion
- [ ] Leaderboard with dummy data
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Backend API integration
- [ ] Real payment gateway
- [ ] User authentication

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the developer.

---

**© 2025 CashBuds | Made with ❤️ by Yash Prajapati**
