// KalaSetu - AI-powered digital marketplace for traditional artisans
// Comprehensive data layer and AI simulation functions

// Sample Products (8 traditional crafts as specified)
export const sampleProducts = [
  {
    id: 'pottery-khurja-001',
    name: 'Khurja Clay Surahi (Water Pot)',
    description: 'Traditional handcrafted clay water pot from Khurja, Uttar Pradesh. Made using ancient techniques, this surahi naturally cools water and features beautiful blue pottery designs.',
    category: 'Pottery',
    tags: ['pottery', 'clay', 'traditional', 'cooling', 'khurja', 'blue-pottery'],
    price: 850,
    priceRange: '₹800 - ₹900',
    region: 'Khurja, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Ramesh Kumar',
      avatar: '👨‍🎨',
      story: 'Ramesh has been working with clay for over 25 years, learning from his father. He specializes in traditional Khurja blue pottery and maintains authentic techniques passed down through generations.'
    },
    specifications: {
      material: 'Natural Clay',
      capacity: '2 Liters',
      height: '12 inches',
      weight: '1.2 kg'
    },
    views: 245,
    orders: 12,
    rating: 4.8,
    img: null
  },
  {
    id: 'textile-banarasi-001',
    name: 'Woven Bamboo Shawl',
    description: 'Exquisite handwoven silk dupatta from Varanasi featuring intricate patterns. Perfect for weddings and special occasions, showcasing centuries-old weaving traditions.',
    category: 'Textiles',
    tags: ['silk', 'banarasi', 'zari', 'handwoven', 'wedding', 'traditional'],
    price: 3500,
    priceRange: '₹3200 - ₹4000',
    region: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Meera Devi',
      avatar: '👩‍🎨',
      story: 'Meera comes from a family of traditional Banarasi weavers spanning 4 generations. She has mastered the intricate art of zari work and is passionate about preserving this UNESCO-recognized craft.'
    },
    specifications: {
      material: 'Pure Silk with Gold Zari',
      length: '2.5 meters',
      width: '1 meter',
      weight: '200g'
    },
    views: 567,
    orders: 28,
    rating: 4.9,
    img: null
  },
  {
    id: 'painting-madhubani-001',
    name: 'Ceramic Vase',
    description: 'Traditional hand-painted ceramic vase with beautiful blue and white patterns. Features intricate floral designs that represent prosperity and good fortune.',
    category: 'Pottery',
    tags: ['ceramic', 'vase', 'handpainted', 'traditional', 'blue-white'],
    price: 1200,
    priceRange: '₹1000 - ₹1500',
    region: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1578262996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Sunita Jha',
      avatar: '🎨',
      story: 'Sunita learned pottery from her grandmother. She uses only natural pigments and traditional techniques, keeping the art form authentic and preserving centuries-old methods.'
    },
    specifications: {
      material: 'Ceramic with natural glaze',
      height: '8 inches',
      diameter: '5 inches',
      weight: '600g'
    },
    views: 189,
    orders: 8,
    rating: 4.7,
    img: null
  },
  {
    id: 'woodwork-channapatna-001',
    name: 'Channapatna Wooden Toys Set',
    description: 'Colorful set of wooden toys from Karnataka made using traditional lacquerware techniques. Completely safe for children, eco-friendly, and painted with natural dyes.',
    category: 'Woodwork',
    tags: ['wooden-toys', 'channapatna', 'lacquerware', 'eco-friendly', 'children', 'karnataka'],
    price: 650,
    priceRange: '₹600 - ₹750',
    region: 'Channapatna, Karnataka',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Govind Rao',
      avatar: '🔨',
      story: 'Govind is a third-generation toy maker from Channapatna. His family has been crafting toys for over 60 years using only natural lacquer and traditional wood turning techniques.'
    },
    specifications: {
      material: 'Hale wood with natural lacquer',
      pieces: '5 toys in set',
      ageGroup: '3+ years',
      safety: 'BIS certified, non-toxic'
    },
    views: 324,
    orders: 19,
    rating: 4.8,
    img: null
  },
  {
    id: 'metalcraft-dhokra-001',
    name: 'Brass Tribal Necklace',
    description: 'Beautiful brass necklace crafted using the ancient Dhokra lost-wax casting technique. Features intricate tribal motifs with dangling gold-tone accents.',
    category: 'Metalcraft',
    tags: ['dhokra', 'brass', 'necklace', 'tribal-art', 'lost-wax-casting', 'jewelry'],
    price: 1500,
    priceRange: '₹1200 - ₹2000',
    region: 'Bastar, Chhattisgarh',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Bharat Singh',
      avatar: '⚒️',
      story: 'Bharat belongs to the traditional Dhokra artisan community practicing this 4000-year-old art. He creates unique pieces that blend ancient tribal motifs with contemporary appeal.'
    },
    specifications: {
      material: 'Pure Brass with gold-tone finish',
      length: '18 inches',
      weight: '150g',
      style: 'Traditional tribal design'
    },
    views: 156,
    orders: 7,
    rating: 4.6,
    img: null
  },
  {
    id: 'textile-kutch-001',
    name: 'Embroidered Jute Bag',
    description: 'Vibrant tote bag featuring traditional Kutch embroidery with colorful floral patterns. Perfect for shopping, travel, or everyday use with authentic handcrafted design.',
    category: 'Textiles',
    tags: ['kutch', 'embroidery', 'bag', 'jute', 'gujarat', 'handicraft'],
    price: 950,
    priceRange: '₹850 - ₹1100',
    region: 'Kutch, Gujarat',
    image: 'https://images.unsplash.com/photo-1590874032007-11417ea210af?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Rekha Ben',
      avatar: '🪡',
      story: 'Rekha learned traditional Kutch embroidery and mirror work from her mother-in-law. She specializes in geometric patterns and vibrant color combinations typical of Gujarati crafts.'
    },
    specifications: {
      material: 'Jute with embroidery',
      size: '14x12 inches',
      handles: 'Woven jute straps',
      capacity: '10-15 liters'
    },
    views: 278,
    orders: 15,
    rating: 4.7,
    img: null
  },
  {
    id: 'pottery-jaipur-001',
    name: 'Handwoven Coasters Set',
    description: 'Beautiful set of natural jute coasters with traditional geometric patterns. Protect your furniture in style with these eco-friendly artisan-made coasters.',
    category: 'Home Decor',
    tags: ['coasters', 'jute', 'handwoven', 'eco-friendly', 'home-decor'],
    price: 400,
    priceRange: '₹350 - ₹500',
    region: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Kishan Lal',
      avatar: '🏺',
      story: 'Kishan comes from a family practicing traditional crafts for 4 generations. He is renowned for his intricate designs and perfect finishing techniques that create timeless pieces.'
    },
    specifications: {
      material: 'Natural Jute',
      pieces: '4 coasters in set',
      size: '4x4 inches each',
      weight: '150g'
    },
    views: 198,
    orders: 9,
    rating: 4.8,
    img: null
  },
  {
    id: 'woodwork-sandalwood-001',
    name: 'Wooden Wall Hanging',
    description: 'Intricately hand-carved wooden wall art with traditional floral motifs. Made from premium wood with detailed lacework design perfect for home decoration.',
    category: 'Woodwork',
    tags: ['woodcarving', 'wall-art', 'handmade', 'traditional', 'home-decor'],
    price: 1800,
    priceRange: '₹1500 - ₹2200',
    region: 'Mysore, Karnataka',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    artisan: {
      name: 'Rajesh Acharya',
      avatar: '🪵',
      story: 'Rajesh is a master woodcarver who learned this sacred art from his grandfather. He specializes in traditional designs and takes months to complete each intricate piece.'
    },
    specifications: {
      material: 'Premium carved wood',
      size: '12x12 inches',
      thickness: '1 inch',
      finish: 'Natural wood lacquer'
    },
    views: 134,
    orders: 5,
    rating: 4.9,
    img: null
  }
];

// Categories with emoji icons
export const categories = [
  { 
    name: 'Pottery', 
    icon: '🏺', 
    description: 'Traditional clay crafts and ceramics',
    regions: ['Khurja', 'Jaipur', 'Kumharwada', 'Manipur'] 
  },
  { 
    name: 'Textiles', 
    icon: '🧵', 
    description: 'Handwoven fabrics and embroidery',
    regions: ['Varanasi', 'Kutch', 'Kanchipuram', 'Chanderi'] 
  },
  { 
    name: 'Painting', 
    icon: '🎨', 
    description: 'Traditional art and folk paintings',
    regions: ['Madhubani', 'Warli', 'Pattachitra', 'Tanjore'] 
  },
  { 
    name: 'Woodwork', 
    icon: '🪵', 
    description: 'Carved wooden items and sculptures',
    regions: ['Channapatna', 'Mysore', 'Kashmir', 'Saharanpur'] 
  },
  { 
    name: 'Metalcraft', 
    icon: '⚒️', 
    description: 'Brass, bronze and metal artifacts',
    regions: ['Bastar', 'Moradabad', 'Thanjavur', 'Pembarthi'] 
  }
];

// Supported languages for voice input (as per handwritten notes)
export const supportedLanguages = [
  { code: 'en-IN', name: 'English', native: 'English' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' }
];

// AI Simulation Functions (Mock implementations)

/**
 * AI-powered listing generation from photo and voice input
 * Simulates image recognition + voice processing + translation
 */
export async function createProductListing(imageFile, voiceText, language = 'en-IN') {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const keywords = voiceText.toLowerCase();
  let generatedListing = {
    name: '',
    description: '',
    category: 'General',
    tags: [],
    priceRange: '₹500 - ₹1000',
    specifications: {}
  };

  // Advanced keyword-based AI simulation
  if (keywords.includes('pot') || keywords.includes('clay') || keywords.includes('मिट्टी') || keywords.includes('pottery')) {
    generatedListing = {
      name: 'Handcrafted Clay Pot',
      description: 'Beautiful traditional clay pot made using authentic techniques. Perfect for storing water or as decorative piece. Eco-friendly and naturally cooling.',
      category: 'Pottery',
      tags: ['pottery', 'clay', 'handmade', 'traditional', 'eco-friendly'],
      priceRange: '₹600 - ₹1200',
      specifications: {
        material: 'Natural Clay',
        handmade: 'Yes',
        technique: 'Traditional pottery wheel'
      }
    };
  } else if (keywords.includes('silk') || keywords.includes('fabric') || keywords.includes('कपड़ा') || keywords.includes('cloth')) {
    generatedListing = {
      name: 'Handwoven Silk Textile',
      description: 'Exquisite handwoven silk textile featuring traditional patterns. Perfect for special occasions and cultural celebrations.',
      category: 'Textiles',
      tags: ['silk', 'handwoven', 'traditional', 'textile', 'festival'],
      priceRange: '₹2000 - ₹4000',
      specifications: {
        material: 'Pure Silk',
        technique: 'Handloom weaving',
        origin: 'Traditional Indian craft'
      }
    };
  } else if (keywords.includes('paint') || keywords.includes('art') || keywords.includes('चित्र') || keywords.includes('painting')) {
    generatedListing = {
      name: 'Traditional Folk Painting',
      description: 'Beautiful traditional artwork painted using natural colors and authentic folk art techniques.',
      category: 'Painting',
      tags: ['painting', 'traditional', 'folk-art', 'natural-colors', 'handpainted'],
      priceRange: '₹800 - ₹2000',
      specifications: {
        medium: 'Natural pigments',
        technique: 'Traditional brush painting',
        style: 'Folk art'
      }
    };
  } else if (keywords.includes('wood') || keywords.includes('carving') || keywords.includes('लकड़ी') || keywords.includes('toy')) {
    generatedListing = {
      name: 'Hand-carved Wooden Craft',
      description: 'Skillfully carved wooden item showcasing traditional craftsmanship and attention to detail.',
      category: 'Woodwork',
      tags: ['woodwork', 'carving', 'handmade', 'traditional', 'artisan'],
      priceRange: '₹500 - ₹1500',
      specifications: {
        material: 'Natural wood',
        technique: 'Hand carving',
        finish: 'Traditional polish'
      }
    };
  } else if (keywords.includes('metal') || keywords.includes('brass') || keywords.includes('धातु') || keywords.includes('bronze')) {
    generatedListing = {
      name: 'Traditional Metal Craft',
      description: 'Intricate metalwork showcasing traditional Indian craftsmanship and cultural heritage.',
      category: 'Metalcraft',
      tags: ['metalcraft', 'traditional', 'handmade', 'cultural', 'heritage'],
      priceRange: '₹700 - ₹2000',
      specifications: {
        material: 'Brass/Bronze',
        technique: 'Traditional casting',
        origin: 'Handcrafted'
      }
    };
  }

  return generatedListing;
}

/**
 * Speech-to-text conversion simulation
 */
export async function speechToText(audioBlob, language = 'en-IN') {
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Mock responses for different languages
  const mockResponses = {
    'en-IN': "This is a beautiful handmade clay pot that I made using traditional techniques passed down from my grandfather. It keeps water naturally cool.",
    'hi-IN': "यह एक सुंदर हस्तनिर्मित मिट्टी का बर्तन है जो मैंने पारंपरिक तकनीकों का उपयोग करके बनाया है।",
    'ta-IN': "இது என் தாத்தாவிடமிருந்து கற்றுக்கொண்ட பாரம्परिक முறைகளைப் பயன्படுत्ति நான் உருவाക्கிய அழকான களிமண् पानै।",
    'bn-IN': "এটি একটি সুন্দর হস্তনির্মিত মাটির পাত্র যা আমি ঐতিহ্যবাহী কৌশল ব্যবহার করে তৈরি করেছি।",
    'mr-IN': "हा एक सुंदर हस्तनिर्मित मातीचा भांडा आहे जो मी पारंपारिक तंत्र वापरून बनवला आहे।",
    'gu-IN': "આ એક સુંદર હસ્તનિર્મિત માટીનો પાત્ર છે જે મેં પરંપરાગત તકનીકોનો ઉપયોગ કરીને બનાવ્યો છે।"
  };
  
  return mockResponses[language] || mockResponses['en-IN'];
}

/**
 * AI Chatbot - Price range assistance
 */
export function getPriceRangeAssistance(category) {
  const ranges = {
    'Pottery': { 
      min: 200, max: 2500, 
      suggested: '₹500 - ₹1200',
      tips: 'Small items: ₹200-600, Medium pots: ₹600-1200, Large/decorative: ₹1200-2500'
    },
    'Textiles': { 
      min: 800, max: 8000, 
      suggested: '₹1500 - ₹4000',
      tips: 'Simple fabrics: ₹800-2000, Silk items: ₹2000-5000, Wedding pieces: ₹5000-8000'
    },
    'Painting': { 
      min: 500, max: 5000, 
      suggested: '₹1000 - ₹3000',
      tips: 'Small paintings: ₹500-1500, Medium art: ₹1500-3000, Large/custom: ₹3000-5000'
    },
    'Woodwork': { 
      min: 300, max: 3500, 
      suggested: '₹600 - ₹1500',
      tips: 'Toys/small items: ₹300-800, Decorative: ₹800-1800, Furniture: ₹1800-3500'
    },
    'Metalcraft': { 
      min: 400, max: 4000, 
      suggested: '₹800 - ₹2200',
      tips: 'Small items: ₹400-1000, Medium crafts: ₹1000-2200, Large pieces: ₹2200-4000'
    }
  };
  
  return ranges[category] || ranges['Pottery'];
}

/**
 * Market demand insights
 */
export function getMarketDemandInsights(category) {
  const demands = {
    'Pottery': { 
      level: 75, 
      trend: 'Rising', 
      seasonal: 'High during festivals and summer',
      insights: 'Eco-friendly pottery seeing 30% growth. Water storage items in high demand.'
    },
    'Textiles': { 
      level: 90, 
      trend: 'Very High', 
      seasonal: 'Peak during wedding season (Oct-Mar)',
      insights: 'Handloom textiles have 40% higher demand post-pandemic. Silk items most popular.'
    },
    'Painting': { 
      level: 60, 
      trend: 'Stable', 
      seasonal: 'Consistent with festival spikes',
      insights: 'Folk art gaining popularity among urban buyers. Custom portraits trending.'
    },
    'Woodwork': { 
      level: 70, 
      trend: 'Growing', 
      seasonal: 'High during gift seasons',
      insights: 'Eco-friendly toys and home decor seeing increased demand. 25% growth annually.'
    },
    'Metalcraft': { 
      level: 65, 
      trend: 'Steady', 
      seasonal: 'Festival periods see 50% spike',
      insights: 'Traditional brass items popular. Modern designs with traditional techniques trending.'
    }
  };
  
  return demands[category] || demands['Pottery'];
}

/**
 * Product recommendations for artisans
 */
export function getProductRecommendations(category, currentSeason = 'general') {
  const recommendations = {
    'Pottery': [
      'Decorative planters (urban demand high)',
      'Kitchen storage jars (eco-trend)',
      'Traditional tea sets (gift market)',
      'Religious figurines (festival season)'
    ],
    'Textiles': [
      'Festive dupattas (wedding season)',
      'Designer cushion covers (home decor)',
      'Traditional table runners (dining trend)',
      'Handloom sarees (cultural revival)'
    ],
    'Painting': [
      'Modern fusion folk art (urban appeal)',
      'Custom family portraits (personal gifts)',
      'Festival decoration pieces (seasonal)',
      'Corporate wall art (office decor)'
    ],
    'Woodwork': [
      'Eco-friendly children toys (safety conscious)',
      'Minimalist home decor (modern homes)',
      'Traditional kitchen utensils (health trend)',
      'Handcrafted jewelry boxes (gifting)'
    ],
    'Metalcraft': [
      'Contemporary design lamps (lighting trend)',
      'Traditional religious items (spirituality)',
      'Modern sculptures (art collectors)',
      'Personalized gift items (custom market)'
    ]
  };
  
  return recommendations[category] || recommendations['Pottery'];
}

// Local Storage Management
export const storage = {
  // Published products by sellers
  getPublishedProducts: () => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('kalasetu_published_products');
    return saved ? JSON.parse(saved) : [];
  },
  
  savePublishedProduct: (product) => {
    if (typeof window === 'undefined') return;
    const existing = storage.getPublishedProducts();
    const newProduct = { 
      ...product, 
      id: `product_${Date.now()}`, 
      publishedAt: new Date().toISOString(),
      views: 0,
      orders: 0,
      rating: 0
    };
    const updated = [...existing, newProduct];
    localStorage.setItem('kalasetu_published_products', JSON.stringify(updated));
    return newProduct;
  },
  
  // Buyer wishlist
  getWishlist: () => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('kalasetu_wishlist');
    return saved ? JSON.parse(saved) : [];
  },
  
  addToWishlist: (productId) => {
    if (typeof window === 'undefined') return false;
    const existing = storage.getWishlist();
    if (!existing.includes(productId)) {
      const updated = [...existing, productId];
      localStorage.setItem('kalasetu_wishlist', JSON.stringify(updated));
      return true;
    }
    return false;
  },
  
  removeFromWishlist: (productId) => {
    if (typeof window === 'undefined') return;
    const existing = storage.getWishlist();
    const updated = existing.filter(id => id !== productId);
    localStorage.setItem('kalasetu_wishlist', JSON.stringify(updated));
  },
  
  // Shopping cart
  getCart: () => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('kalasetu_cart');
    return saved ? JSON.parse(saved) : [];
  },
  
  addToCart: (productId, quantity = 1) => {
    if (typeof window === 'undefined') return;
    const existing = storage.getCart();
    const existingItem = existing.find(item => item.productId === productId);
    
    let updated;
    if (existingItem) {
      updated = existing.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updated = [...existing, { 
        productId, 
        quantity, 
        addedAt: new Date().toISOString() 
      }];
    }
    
    localStorage.setItem('kalasetu_cart', JSON.stringify(updated));
  },
  
  updateCartQuantity: (productId, quantity) => {
    if (typeof window === 'undefined') return;
    if (quantity <= 0) {
      storage.removeFromCart(productId);
      return;
    }
    
    const existing = storage.getCart();
    const updated = existing.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('kalasetu_cart', JSON.stringify(updated));
  },
  
  removeFromCart: (productId) => {
    if (typeof window === 'undefined') return;
    const existing = storage.getCart();
    const updated = existing.filter(item => item.productId !== productId);
    localStorage.setItem('kalasetu_cart', JSON.stringify(updated));
  },
  
  clearCart: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('kalasetu_cart');
  },
  
  // User preferences and settings
  getUserPreferences: () => {
    if (typeof window === 'undefined') return { 
      interests: [], 
      theme: 'light', 
      language: 'en-IN',
      role: null 
    };
    const saved = localStorage.getItem('kalasetu_user_preferences');
    return saved ? JSON.parse(saved) : { 
      interests: [], 
      theme: 'light', 
      language: 'en-IN',
      role: null 
    };
  },
  
  updateUserPreferences: (preferences) => {
    if (typeof window === 'undefined') return;
    const existing = storage.getUserPreferences();
    const updated = { ...existing, ...preferences };
    localStorage.setItem('kalasetu_user_preferences', JSON.stringify(updated));
  }
};

// Utility functions
export function getAllProducts() {
  const published = storage.getPublishedProducts();
  return [...sampleProducts, ...published];
}

export function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
}

export function getProductsByCategory(category) {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.category === category);
}

export function searchProducts(query, category = null) {
  const allProducts = getAllProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return allProducts.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesQuery = 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.region.toLowerCase().includes(lowercaseQuery) ||
      product.artisan.name.toLowerCase().includes(lowercaseQuery);
    
    return matchesCategory && matchesQuery;
  });
}