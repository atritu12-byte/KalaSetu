# 🎨 KalaSetu - AI-Powered Digital Marketplace for Traditional Artisans

**A voice-first, multi-lingual platform that helps traditional and marginalized artisans create digital product listings, reach wider markets, and sell their products without needing advanced digital, typing or language skills.**

![KalaSetu Logo](https://img.shields.io/badge/KalaSetu-AI%20Marketplace-8B4513?style=for-the-badge&logo=palette&logoColor=white)

## 🌟 One-Line Concept

KalaSetu bridges the gap between traditional artisans and digital commerce using AI-powered voice interfaces, enabling artisans to create professional listings by simply taking a photo and describing their craft in their native language.

## ✨ Key Features

### 🎤 Voice-First Interface
- **Multi-lingual Support**: Hindi, English, Tamil, Bengali, Marathi, Gujarati
- **Speech-to-Text**: Convert artisan descriptions to professional listings
- **Voice Navigation**: Navigate the app using voice commands
- **No Typing Required**: Complete product listing without keyboard input

### 🤖 AI-Powered Assistance
- **Smart Product Recognition**: Analyze product photos automatically  
- **Professional Listings**: Generate names, descriptions, categories, tags
- **Price Recommendations**: AI suggests optimal pricing based on market data
- **Market Insights**: Real-time demand analysis and trends
- **Intelligent Chatbot**: 24/7 assistance with context-aware responses

### 🏪 Dual User Roles

#### 👨‍🎨 For Artisans/Sellers
- **Simple Dashboard**: Track listings, views, orders
- **5-Step Listing Flow**: Photo → Voice → AI → Approve → Publish  
- **AI Assistant**: Price guidance, market demand, product recommendations
- **Revenue Analytics**: Performance tracking and insights

#### 🛒 For Buyers
- **Personalized Shopping**: Interest-based recommendations
- **Advanced Search**: Filter by category, region, price, artisan
- **Artisan Stories**: Learn about craftspeople and their heritage
- **Wishlist & Cart**: Full e-commerce functionality
- **Cultural Impact**: Support traditional crafts and heritage preservation

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18, TypeScript
- **Styling**: Plain CSS with CSS Variables (mobile-first, responsive)
- **Icons**: Lucide React
- **Voice**: Web Speech API
- **Storage**: localStorage (for demo, easily replaceable)
- **AI Simulation**: Mock functions (ready for real API integration)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kalasetu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Project Structure
```
kalasetu/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Landing page with role selection
│   ├── seller/            # Artisan/Seller dashboard
│   ├── buyer/             # Buyer marketplace  
│   └── globals.css        # Beautiful responsive CSS
├── components/            # Reusable React components
│   ├── VoiceInterface.tsx # Speech recognition & voice nav
│   └── AIChatbot.tsx      # Intelligent chatbot
├── lib/
│   └── data.js           # Sample data & AI simulation functions
└── README.md             # This file
```

## 🎯 Sample Data

The app includes **8 authentic traditional crafts**:

1. **🏺 Khurja Clay Surahi** - Traditional water cooling pot
2. **🧵 Banarasi Silk Dupatta** - Handwoven silk with zari work  
3. **🎨 Madhubani Fish Painting** - Traditional Bihar art with natural colors
4. **🪵 Channapatna Wooden Toys** - Karnataka lacquerware toys for children
5. **⚒️ Dhokra Brass Diya** - Ancient lost-wax casting technique
6. **🪡 Kutch Embroidered Cushion** - Gujarat mirror work embroidery
7. **🏺 Jaipur Blue Pottery Vase** - Persian-influenced glazing technique  
8. **🪵 Sandalwood Ganesha** - Master-carved religious sculpture

Each product includes:
- Artisan name, avatar, and life story
- Regional origin and cultural context
- Authentic pricing and specifications
- Traditional techniques and materials

## 🌐 Multi-Language Support

### Supported Languages
- **English** (en-IN) - English
- **Hindi** (hi-IN) - हिंदी  
- **Tamil** (ta-IN) - தமிழ்
- **Bengali** (bn-IN) - বাংলা
- **Marathi** (mr-IN) - मराठी
- **Gujarati** (gu-IN) - ગુજરાતી

Voice input automatically detects language and provides appropriate responses.

## 🤖 AI Features (Current Implementation)

### Simulated AI Functions
All AI features are currently **mock implementations** ready for real API integration:

```javascript
// Image + Voice → Product Listing
createProductListing(imageFile, voiceText, language)

// Speech Recognition  
speechToText(audioBlob, language)

// Market Intelligence
getPriceRangeAssistance(category)
getMarketDemandInsights(category)  
getProductRecommendations(category)
```

### Chatbot Capabilities
The AI assistant provides context-aware help:
- **Price Guidance**: Category-specific pricing recommendations
- **Market Insights**: Demand trends and seasonal patterns  
- **Product Ideas**: "What to make next" suggestions
- **Shopping Help**: Product discovery and artisan stories

## 📱 Responsive Design

### Mobile-First Approach
- **Large Tap Targets**: 44px+ for easy mobile interaction
- **Voice-Optimized**: Reduces need for typing on small screens
- **Progressive Enhancement**: Works on feature phones to high-end devices
- **Accessible**: WCAG compliance, keyboard navigation, screen reader support

### Design System
- **Warm Color Palette**: Earth tones reflecting traditional crafts
- **Themed Interfaces**: Green/gold for sellers, pink/orange for buyers
- **Beautiful Gradients**: CSS gradients for visual appeal
- **Smooth Animations**: Subtle transitions and hover effects

## 💾 Data Persistence

### Current Implementation (localStorage)
```javascript
// Published products by sellers
storage.savePublishedProduct(product)
storage.getPublishedProducts()

// Buyer wishlist & cart  
storage.addToWishlist(productId)
storage.addToCart(productId, quantity)

// User preferences
storage.updateUserPreferences(prefs)
```

### Easy Database Migration
Replace localStorage functions with:
- **Database**: PostgreSQL, MongoDB, Supabase
- **Authentication**: NextAuth.js, Clerk, Firebase Auth
- **File Storage**: AWS S3, Cloudinary, Uploadcare

## 🔌 Real AI Integration Guide

### 1. Image Recognition
Replace `createProductListing()` with:
```javascript
// Option 1: OpenAI GPT-4 Vision
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [{ 
    role: "user", 
    content: [
      { type: "text", text: "Analyze this craft product..." },
      { type: "image_url", image_url: { url: imageUrl }}
    ]
  }]
});

// Option 2: Google Cloud Vision + Gemini
const vision = new ImageAnnotatorClient();
const [result] = await vision.objectLocalization(image);
```

### 2. Speech Recognition  
Replace `speechToText()` with:
```javascript
// Option 1: Google Cloud Speech-to-Text
const speech = new SpeechClient();
const request = {
  audio: { content: audioBytes },
  config: {
    encoding: 'WEBM_OPUS',
    languageCode: 'hi-IN', // Multi-language support
    enableAutomaticPunctuation: true
  }
};

// Option 2: Azure Cognitive Services
const speechConfig = SpeechConfig.fromSubscription(key, region);
speechConfig.speechRecognitionLanguage = "hi-IN";
```

### 3. Translation Services
```javascript
// Google Translate API
const translate = new Translate({ key: apiKey });
const [translation] = await translate.translate(text, 'en');

// Azure Translator  
const response = await axios.post(endpoint, [{
  'text': voiceInput
}], {
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Content-type': 'application/json'
  }
});
```

## 💳 Payment Integration

### Recommended Payment Providers

#### For Indian Market
```javascript
// Razorpay Integration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Support for UPI, Cards, Net Banking, Wallets
const order = await razorpay.orders.create({
  amount: totalAmount * 100, // Amount in paise
  currency: 'INR',
  receipt: `order_${Date.now()}`
});
```

#### International Support  
```javascript
// Stripe for Global Payments
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount * 100,
  currency: 'usd',
  metadata: { artisan_id: product.artisan.id }
});
```

## 🌍 Deployment

### Recommended Platforms

#### Vercel (Easiest)
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

#### Self-Hosted
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Future Enhancements

### Immediate Roadmap (Next 3 months)
- [ ] Real AI API integration (GPT-4 Vision + Speech)
- [ ] Database migration (PostgreSQL + Prisma)  
- [ ] User authentication system
- [ ] Payment gateway integration (Razorpay + Stripe)
- [ ] Image upload & storage (Cloudinary)

### Medium Term (6 months)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Inventory management for artisans  
- [ ] Shipping integration (Delhivery, BlueDart)
- [ ] Multi-vendor marketplace features

### Long Term Vision (1 year+)
- [ ] B2B wholesale marketplace
- [ ] Artisan training programs
- [ ] Craft authenticity verification
- [ ] International shipping & customs
- [ ] Augmented reality product preview
- [ ] Blockchain supply chain tracking

## 🤝 Contributing

### For Developers
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`  
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### For Artisans & Cultural Experts
- **Feedback on User Experience**: Test the seller interface 
- **Cultural Authenticity**: Verify product descriptions and stories
- **Language Support**: Help improve regional language features
- **Community Outreach**: Connect with artisan communities

## 📞 Support & Contact

### Technical Support
- **Documentation**: Check this README and inline code comments
- **Issues**: Open GitHub issues for bugs and feature requests  
- **Discussions**: Use GitHub Discussions for questions

### Business Inquiries  
- **Partnerships**: Collaborations with artisan organizations
- **Investment**: Scaling and expansion opportunities
- **Cultural Guidance**: Authenticity and representation

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Inspiration
- Traditional artisan communities across India
- UNESCO Intangible Cultural Heritage initiatives  
- Digital inclusion and empowerment movements
- Voice-first technology for accessibility

### Technical Credits
- **Next.js Team** for the amazing React framework
- **Lucide** for beautiful, consistent icons
- **Web Speech API** for browser-native voice recognition
- **Open Source Community** for countless tools and libraries

---

## 🎨 "Bridging Tradition with Technology"

KalaSetu represents more than just a marketplace—it's a bridge between centuries-old traditions and modern technology, empowering artisans while preserving cultural heritage for future generations.

**"Our project uses AI to bridge the gap between traditional artisans and the digital marketplace, helping artisans reach more customers while helping buyers discover and support traditional crafts."**

---

### 🚀 Ready to launch? Run `npm run dev` and start exploring KalaSetu!

For questions, feedback, or collaboration opportunities, we'd love to hear from you. Together, we can empower traditional artisans and preserve cultural heritage through technology.

**Happy Crafting! 🎨✨**