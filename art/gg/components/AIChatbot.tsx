'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Bot, DollarSign, TrendingUp, Lightbulb, User } from 'lucide-react';
import { 
  categories, 
  getPriceRangeAssistance, 
  getMarketDemandInsights, 
  getProductRecommendations 
} from '../lib/data';
import VoiceInterface from './VoiceInterface';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  userRole?: 'seller' | 'buyer';
}

export default function AIChatbot({ userRole = 'buyer' }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat opens
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: userRole === 'seller' 
          ? "Hi! I'm your AI assistant. I can help you with pricing, market demand insights, and product recommendations. What would you like to know?"
          : "Hello! I'm here to help you discover amazing handmade crafts. I can suggest products, explain artisan stories, or help you find the perfect item. How can I assist you?",
        timestamp: new Date(),
        suggestions: userRole === 'seller' 
          ? ['Price guidance', 'Market demand', 'Product ideas', 'Craft categories']
          : ['Show recommendations', 'Find specific items', 'Learn about artisans', 'Browse categories']
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userRole]);

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let content = '';
    let suggestions: string[] = [];

    // Price-related queries
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      if (userRole === 'seller') {
        const category = categories.find(cat => 
          input.includes(cat.name.toLowerCase())
        );
        
        if (category) {
          const priceInfo = getPriceRangeAssistance(category.name);
          content = `For ${category.name} ${category.icon}, I recommend pricing between ${priceInfo.suggested}. 

💡 **Pricing Tips:**
${priceInfo.tips}

The market range is ₹${priceInfo.min} - ₹${priceInfo.max}. Price competitively but don't undervalue your craft!`;
          
          suggestions = ['Market demand for this', 'What else to make', 'Other categories'];
        } else {
          content = `I can help you with pricing! Which craft category are you working with?

Choose from: ${categories.map(cat => `${cat.icon} ${cat.name}`).join(', ')}`;
          suggestions = categories.map(cat => cat.name);
        }
      } else {
        content = `Our products range from ₹200 for small items to ₹8000 for premium pieces. 

**Price Ranges by Category:**
🏺 Pottery: ₹200 - ₹2500
🧵 Textiles: ₹800 - ₹8000  
🎨 Painting: ₹500 - ₹5000
🪵 Woodwork: ₹300 - ₹3500
⚒️ Metalcraft: ₹400 - ₹4000

All prices reflect fair compensation for artisans and the value of handmade crafts.`;
        suggestions = ['Show affordable items', 'Premium products', 'Best value crafts'];
      }
    }
    
    // Market demand queries
    else if (input.includes('demand') || input.includes('popular') || input.includes('trending')) {
      if (userRole === 'seller') {
        content = `**Current Market Demand Insights:**

📈 **Highest Demand:** Textiles (90%) - Wedding season driving sales
📊 **Growing:** Pottery (75%) - Eco-friendly trend  
⚡ **Stable:** Woodwork (70%) - Home decor popular
📉 **Steady:** Metalcraft (65%) - Festival purchases
🎯 **Consistent:** Painting (60%) - Art collectors market

**Pro Tips:**
• Textiles peak Oct-March (wedding season)
• Pottery demand higher in summer (cooling properties)
• Festival items see 50% spike during celebrations`;

        suggestions = ['Seasonal trends', 'Best time to sell', 'Competition analysis'];
      } else {
        content = `**What's Trending Right Now:**

🔥 **Most Popular:** Banarasi silk items & blue pottery
⭐ **Rising:** Eco-friendly wooden toys & clay items  
💝 **Gift Favorites:** Madhubani paintings & metal crafts
🏠 **Home Decor:** Kutch embroidery & carved items

Handmade products are seeing 40% growth as people value authenticity!`;
        suggestions = ['Show trending items', 'Eco-friendly products', 'Gift recommendations'];
      }
    }
    
    // Product recommendations
    else if (input.includes('recommend') || input.includes('suggest') || input.includes('what to make') || input.includes('ideas')) {
      if (userRole === 'seller') {
        content = `**Top Product Recommendations Right Now:**

🏺 **Pottery:** Decorative planters (urban demand high), Kitchen storage jars
🧵 **Textiles:** Festive dupattas, Designer cushion covers  
🎨 **Painting:** Modern fusion art, Custom portraits
🪵 **Woodwork:** Eco-friendly toys, Minimalist home decor
⚒️ **Metalcraft:** Contemporary lamps, Traditional religious items

**Hot Tip:** Products combining traditional techniques with modern designs sell 3x better!`;
        suggestions = ['Seasonal products', 'High profit items', 'Easy to make'];
      } else {
        content = `**Personalized Recommendations:**

Based on current trends, I suggest:

✨ **For You:** Handwoven textiles with modern patterns
🎁 **Gifts:** Traditional paintings with contemporary frames  
🏠 **Home:** Artisan-made pottery for plants and decor
👶 **Family:** Safe wooden toys with natural finishes

Want recommendations based on specific interests or occasions?`;
        suggestions = ['For festivals', 'Wedding gifts', 'Home decoration', 'Personal use'];
      }
    }
    
    // Artisan/craft information
    else if (input.includes('artisan') || input.includes('maker') || input.includes('craft') || input.includes('story')) {
      content = `**Meet Our Amazing Artisans:**

👨‍🎨 **Ramesh Kumar** (Khurja) - 25 years pottery expertise
👩‍🎨 **Meera Devi** (Varanasi) - 4th generation silk weaver  
🎨 **Sunita Jha** (Madhubani) - Natural pigment painting master
🔨 **Govind Rao** (Channapatna) - 60-year family toy making tradition

Each artisan has a unique story and maintains authentic traditional techniques passed down through generations.`;
      
      suggestions = ['Learn more stories', 'Regional crafts', 'Traditional techniques'];
    }
    
    // Categories and browsing
    else if (input.includes('category') || input.includes('browse') || input.includes('types')) {
      content = `**Craft Categories Available:**

🏺 **Pottery** - Traditional clay crafts and ceramics
🧵 **Textiles** - Handwoven fabrics and embroidery  
🎨 **Painting** - Traditional art and folk paintings
🪵 **Woodwork** - Carved wooden items and sculptures
⚒️ **Metalcraft** - Brass, bronze and metal artifacts

Each category features authentic regional specialties from master artisans across India.`;
      
      suggestions = categories.map(cat => `Browse ${cat.name}`);
    }
    
    // Help and general queries
    else if (input.includes('help') || input.includes('how') || input.includes('support')) {
      content = userRole === 'seller' 
        ? `**How I Can Help You:**

💰 **Pricing Guidance** - Get optimal price ranges for your crafts
📊 **Market Insights** - Understand demand and trends  
💡 **Product Ideas** - Discover what's selling well
🎯 **Category Info** - Learn about different craft markets
🗣️ **Voice Support** - Use voice commands for easier interaction

Just ask me anything about selling your crafts!`
        : `**How I Can Help You:**

🔍 **Product Discovery** - Find perfect items for your needs
👥 **Artisan Stories** - Learn about the makers behind crafts
💝 **Gift Suggestions** - Get recommendations for occasions  
🏷️ **Price Information** - Understand fair pricing
🛒 **Shopping Tips** - Make informed purchases

Ask me anything about our handmade treasures!`;
      
      suggestions = userRole === 'seller' 
        ? ['Pricing help', 'Market trends', 'Product ideas']
        : ['Find products', 'Learn about crafts', 'Shopping advice'];
    }
    
    // Greeting responses
    else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      content = userRole === 'seller'
        ? `Hello! Ready to grow your craft business? I'm here to help with pricing, market insights, and product recommendations. What's on your mind?`
        : `Hi there! Welcome to KalaSetu! I'm excited to help you discover beautiful handmade crafts from talented artisans. What are you looking for today?`;
      
      suggestions = userRole === 'seller' 
        ? ['Price guidance', 'Market demand', 'Product ideas']
        : ['Show me crafts', 'Learn about artisans', 'Find gifts'];
    }
    
    // Default response
    else {
      content = userRole === 'seller'
        ? `I can help you with pricing guidance, market demand insights, and product recommendations for your crafts. What would you like to know?

Try asking about:
• "What's the price range for pottery?"
• "What's in demand right now?"  
• "What should I make next?"`
        : `I'd love to help you find amazing handmade crafts! I can show you products, tell you about artisans, or help you discover something special.

Try asking:
• "Show me recommendations"
• "What's popular right now?"
• "Tell me about the artisans"`;
      
      suggestions = userRole === 'seller' 
        ? ['Pricing help', 'Market insights', 'Product ideas', 'Categories info']
        : ['Browse products', 'Popular items', 'Artisan stories', 'Gift ideas'];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      suggestions
    };
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleVoiceInput = (text: string) => {
    setShowVoiceInput(false);
    sendMessage(text);
  };

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to JSX
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={index}>{line.slice(2, -2)}</strong>;
      }
      if (line.startsWith('💡 **')) {
        return (
          <div key={index} style={{ 
            background: 'var(--bg-tertiary)', 
            padding: 'var(--spacing-sm)', 
            borderRadius: 'var(--border-radius)',
            margin: 'var(--spacing-xs) 0'
          }}>
            <strong>{line}</strong>
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className="floating-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen 
            ? 'var(--error-color)' 
            : (userRole === 'seller' ? 'var(--accent-primary)' : 'var(--accent-secondary)')
        }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: 'var(--spacing-lg)',
          width: '380px',
          maxWidth: '90vw',
          height: '500px',
          background: 'var(--bg-primary)',
          border: '3px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: '0 20px 50px var(--shadow-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'var(--gradient-warm)',
            color: 'white',
            padding: 'var(--spacing-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <Bot size={24} />
              <div>
                <h4 style={{ margin: 0 }}>AI Assistant</h4>
                <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', opacity: 0.9 }}>
                  {userRole === 'seller' ? 'Pricing • Demand • Recommendations' : 'Discovery • Stories • Recommendations'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: 'var(--spacing-md)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)'
          }}>
            {messages.map(message => (
              <div key={message.id} style={{
                display: 'flex',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 'var(--spacing-sm)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: message.type === 'user' 
                    ? 'var(--accent-tertiary)' 
                    : 'var(--gradient-warm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div style={{
                  background: message.type === 'user' 
                    ? 'var(--accent-primary)' 
                    : 'var(--bg-secondary)',
                  color: message.type === 'user' ? 'white' : 'var(--text-primary)',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius)',
                  maxWidth: '80%',
                  fontSize: 'var(--font-size-sm)',
                  lineHeight: '1.4'
                }}>
                  {typeof message.content === 'string' 
                    ? formatMessage(message.content)
                    : message.content
                  }
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--spacing-xs)',
                      marginTop: 'var(--spacing-sm)'
                    }}>
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                            borderRadius: 'var(--border-radius)',
                            fontSize: 'var(--font-size-xs)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'var(--accent-secondary)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'var(--accent-primary)';
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gradient-warm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Bot size={16} />
                </div>
                <div className="loading" style={{
                  background: 'var(--bg-secondary)',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  Thinking...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Modal */}
          {showVoiceInput && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                background: 'var(--bg-primary)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--border-radius-lg)',
                textAlign: 'center'
              }}>
                <VoiceInterface 
                  onVoiceResult={handleVoiceInput}
                  placeholder="Ask me anything..."
                />
                <button 
                  onClick={() => setShowVoiceInput(false)}
                  className="btn btn-secondary"
                  style={{ marginTop: 'var(--spacing-lg)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: 'var(--spacing-md)',
            borderTop: '2px solid var(--border-color)',
            background: 'var(--bg-primary)'
          }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm)',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: 'var(--font-size-sm)',
                  background: 'var(--bg-primary)'
                }}
              />
              <button 
                onClick={() => setShowVoiceInput(true)}
                className="btn btn-secondary"
                style={{ padding: 'var(--spacing-sm)' }}
              >
                <Mic size={16} />
              </button>
              <button 
                onClick={() => sendMessage(inputText)}
                className="btn btn-primary"
                style={{ padding: 'var(--spacing-sm)' }}
                disabled={!inputText.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}