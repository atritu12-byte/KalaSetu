# 🏺 KalaSetu

**AI-powered digital marketplace for traditional Indian artisans. Voice-first, multilingual, zero-typing required.**

---

## ✨ Core Features

### 🎤 Voice-First Platform
- Multi-language support (Hindi, Tamil, Telugu, Punjabi, Gujarati, Marathi, English)
- Speech-to-text with instant translation
- Voice navigation throughout the app

### 🤖 AI Intelligence
- Automatic product recognition and listing generation
- Smart category, tags, and pricing recommendations
- Real-time market insights and trends
- 24/7 AI chatbot assistance

### � Two Simple Roles
- **Sellers (Artisans)**: Create listings with voice + photo
- **Buyers**: Discover authentic crafts, support artisans

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: CSS Variables with responsive design
- **Voice**: Web Speech API
- **AI**: Gemini API for translation & metadata extraction
- **Icons**: Lucide React
- **Storage**: Cloudinary for images

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.local and add your API keys:
# - NEXT_PUBLIC_GEMINI_API_KEY
# - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
# - NEXT_PUBLIC_CLOUDINARY_API_KEY

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
app/
├── page.tsx              # Landing & role selection
├── seller/               # Seller dashboard
├── buyer/                # Buyer marketplace
├── api/                  # Backend endpoints
│   ├── process-speech/   # Speech translation & metadata
│   ├── chat/             # AI chatbot
│   └── translate/        # Text translation
└── globals.css           # Responsive design system

components/
├── AIChatbot.tsx         # Chatbot interface
└── VoiceInterface.tsx    # Voice recording component

lib/
└── cloudinary.js         # Image upload utilities
```

---

## � How It Works

### For Sellers
1. Take a photo of your craft
2. Describe it in your native language (mic button)
3. AI automatically extracts category, tags, price
4. Review and publish your listing

### For Buyers
1. Browse marketplace by category or region
2. Read artisan stories and craft heritage
3. Add items to wishlist or cart
4. Support traditional crafts

---

## 🌐 Language Support

- English (en-IN)
- हिंदी (hi-IN)
- தமிழ் (ta-IN)
- తెలుగు (te-IN)
- ਪੰਜਾਬੀ (pa-IN)
- ગુજરાતી (gu-IN)
- मराठी (mr-IN)

---

## 📱 Responsive Design

- Mobile-first approach
- Large tap targets (44px+)
- Works on all devices
- Voice input reduces typing on small screens
- WCAG accessibility compliance

---

## 🔌 Real AI Integration

The app is built to easily integrate with:

- **Speech Recognition**: Google Cloud Speech-to-Text, Azure Cognitive Services
- **Translation**: Google Translate API, Azure Translator
- **Image Analysis**: GPT-4 Vision, Google Cloud Vision
- **Payments**: Razorpay (India), Stripe (Global)
- **Storage**: AWS S3, Cloudinary, Uploadcare

Currently using **Gemini API** for translation and metadata extraction.

---

## 📊 Future Roadmap

- Real database integration (PostgreSQL/Supabase)
- User authentication system
- Payment gateway integration
- Advanced seller analytics
- Mobile app (React Native)
- B2B wholesale marketplace
- Artisan training programs

---

## 🤝 How to Contribute

- Test the platform as artisan or buyer
- Report bugs and suggest features
- Help improve language support
- Share feedback on UX/design

---

## 📜 License

MIT License - feel free to use and modify

---

**Bridging tradition with technology. Supporting artisans. Preserving heritage.**

🏺 Ready to explore? Run `npm run dev` and visit http://localhost:3000
