# RightsGuard - Base Mini App

**Know Your Rights, Stay Safe.**

RightsGuard is a mobile-first Base Mini App that empowers individuals with crucial legal rights information during police interactions and provides tools to document incidents safely.

## 🚀 Features

### Core Features
- **State-Specific Rights Guides**: Location-based legal rights information tailored to your current state
- **Verbal De-escalation Scripts**: Ready-to-use scripts in English and Spanish for common police interaction scenarios
- **One-Tap Incident Recording**: Discreet audio/video recording with automatic location logging
- **Emergency Contact Alerts**: Instant notifications to pre-selected contacts with location sharing
- **Shareable Rights Card Generation**: Create and share digital rights cards via Farcaster

### Premium Features ($4.99/month)
- Spanish translations for all content
- Cloud backup of recordings
- Advanced emergency alerts
- Priority support

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom glass morphism design
- **AI**: OpenAI/OpenRouter for content generation
- **Storage**: Local storage + Supabase (planned)
- **Notifications**: Twilio SMS (planned)
- **IPFS**: Pinata for decentralized storage (planned)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Base wallet (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rightsguard-base-miniapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from Coinbase Developer Platform
   - `OPENAI_API_KEY` or `OPENROUTER_API_KEY`: For AI content generation

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### For Users
1. **Location Detection**: Allow location access for state-specific rights information
2. **Rights Guide**: View your legal rights based on your current state
3. **De-escalation Scripts**: Access calm, respectful scripts for police interactions
4. **Incident Recording**: Tap to start discreet recording during interactions
5. **Emergency Alerts**: Set up emergency contacts for automatic notifications

### For Developers
- All components are in `/components` directory
- State management uses React hooks and local storage
- AI content generation is handled in `/lib/openai.ts`
- Utility functions are in `/lib/utils.ts`

## 🏗 Architecture

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main homepage
├── providers.tsx      # MiniKitProvider setup
└── globals.css        # Global styles

components/
├── AppHeader.tsx           # Navigation header
├── StateGuideCard.tsx      # Rights guide display
├── CallToActionButtons.tsx # Main action buttons
├── EmergencyAlertButton.tsx # Emergency alert system
├── ScriptDisplay.tsx       # De-escalation scripts
└── IncidentRecorder.tsx    # Recording functionality

lib/
├── types.ts           # TypeScript interfaces
├── constants.ts       # App constants
├── utils.ts          # Utility functions
└── openai.ts         # AI content generation
```

## 🔐 Privacy & Security

- **Local Storage**: Sensitive data stored locally on device
- **Encrypted Recording**: Recordings are encrypted before storage
- **No Tracking**: No user tracking or analytics
- **Open Source**: Transparent, auditable code

## 🚨 Legal Disclaimer

RightsGuard provides general legal information and should not be considered legal advice. Laws vary by jurisdiction. Always consult with a qualified attorney for specific legal situations.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and code of conduct.

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component patterns
- Test on mobile devices
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Email**: support@rightsguard.app
- **Documentation**: [docs.rightsguard.app](https://docs.rightsguard.app)
- **Community**: Join our Discord server

## 🗺 Roadmap

- [ ] Supabase integration for cloud storage
- [ ] Twilio SMS emergency alerts
- [ ] Farcaster sharing integration
- [ ] Multi-language support expansion
- [ ] Legal resource directory
- [ ] Community incident reporting

---

**Remember: Your safety comes first. This app is a tool to help you know your rights, but your personal safety should always be the top priority.**
