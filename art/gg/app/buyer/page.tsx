'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Heart, ShoppingCart, Users, MapPin, ArrowLeft, 
  Filter, Star, Eye, TrendingUp, Globe, Sparkles, MessageCircle, Mic, Bot, Sun, Moon
} from 'lucide-react';
import { 
  sampleProducts, 
  categories, 
  storage, 
  getAllProducts, 
  searchProducts, 
  getProductsByCategory 
} from '../../lib/data';

export default function BuyerMarketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setWishlist(storage.getWishlist());
    setCart(storage.getCart());
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (searchQuery) {
      const categoryParam = selectedCategory === '' ? null : selectedCategory;
      filtered = searchProducts(searchQuery, categoryParam as any);
    } else if (selectedCategory) {
      filtered = getProductsByCategory(selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      storage.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      storage.addToWishlist(productId);
      setWishlist(prev => [...prev, productId]);
    }
  };

  const addToCart = (productId: string) => {
    storage.addToCart(productId, 1);
    setCart(storage.getCart());
  };

  const ProductCard = ({ product, showAddToCart = true }: { product: any; showAddToCart?: boolean }) => {
    return (
      <div className="card product-card">
        <div className="product-image" style={{
          background: 'linear-gradient(135deg, #8B7355 0%, #d4a574 100%)',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: product.image ? `url('${product.image}')` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {!product.image && categories.find(cat => cat.name === product.category)?.icon || '🎨'}
          <button
            onClick={() => toggleWishlist(product.id)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: wishlist.includes(product.id) ? '#e91e63' : 'white',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.3)';
            }}
          >
            <Heart size={18} fill={wishlist.includes(product.id) ? '#e91e63' : 'none'} />
          </button>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">₹{product.price.toLocaleString()}</p>
          <p style={{ 
            fontSize: 'var(--font-size-sm)', 
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-md)'
          }}>
            {product.description.substring(0, 100)}...
          </p>
          
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="artisan-profile">
            <div className="artisan-avatar">{product.artisan.avatar}</div>
            <div className="artisan-info">
              <h4>{product.artisan.name}</h4>
              <p className="artisan-region">{product.region}</p>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-sm)', 
            alignItems: 'center',
            marginBottom: 'var(--spacing-md)'
          }}>
            <Star size={16} style={{ color: '#fbbf24' }} />
            <span>{product.rating}/5</span>
            <Eye size={16} style={{ marginLeft: 'var(--spacing-sm)' }} />
            <span>{product.views}</span>
          </div>

          {showAddToCart && (
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => toggleWishlist(product.id)}
                style={{ 
                  flex: 1,
                  background: wishlist.includes(product.id) ? 'var(--accent-secondary)' : 'var(--bg-secondary)'
                }}
              >
                <Heart size={18} />
                {wishlist.includes(product.id) ? 'Saved' : 'Save'}
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => addToCart(product.id)}
                style={{ flex: 2 }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page-wrapper-fullscreen">
      {/* Professional Header */}
      <header className="header-professional">
        <div className="container-full">
          <div className="header-content-professional">
            {/* Brand Section */}
            <div className="brand-section">
              <Link href="/" className="logo-professional">
                <div className="logo-icon">
                  क
                </div>
                <div className="logo-text">
                  <span className="brand-name">KalaSetu</span>
                  <span className="gi-badge">GI REGISTRY</span>
                </div>
              </Link>
              
              {/* Mode Switcher */}
              <nav className="mode-switcher">
                <Link href="/buyer" className="mode-link active">
                  Buyer Marketplace
                </Link>
                <Link href="/seller" className="mode-link">
                  Artisan Studio
                </Link>
              </nav>
            </div>

            {/* Global Search Bar */}
            <div className="search-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search handmade products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-professional"
                />
                <Search className="search-icon-professional" />
              </div>
            </div>

            {/* Actions */}
            <div className="header-actions">
              <button className="action-btn">
                <Heart size={20} />
              </button>
              <button className="action-btn cart-btn">
                <ShoppingCart size={20} />
                <span className="cart-count">{cart.length}</span>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <div style={{ fontSize: '1.5rem' }}>👤</div>
                <span style={{ fontSize: '0.9rem' }}>Priya S.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="buyer-main-content">
        <div className="buyer-container">
          {/* Sidebar */}
          <aside className="buyer-sidebar">
            {/* Categories */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">📂 Categories</h3>
              <div className="category-list">
                {['Home Decor', 'Fashion & Textiles', 'Jewellery', 'Art & Paintings', 'Wood Crafts', 'Pottery & Ceramics', 'Bags & Accessories', 'Others'].map((cat, idx) => (
                  <div
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    <span className="category-icon">
                      {['🏠', '👗', '💎', '🎨', '🪵', '🏺', '👜', '⭐'][idx]}
                    </span>
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">🌐 Languages</h3>
              <div className="language-buttons">
                {['English', 'Hindi', 'Tamil', 'Bengali', 'Marathi', 'Telugu'].map(lang => (
                  <button key={lang} className="language-btn">
                    {lang}
                  </button>
                ))}
              </div>
              <button className="more-btn">+ More</button>
            </div>
          </aside>

          {/* Main Content */}
          <section className="buyer-main">
            {/* Hero Banner */}
            <div className="hero-banner">
              <div className="hero-content">
                <h1 className="hero-title">
                  Authentic Crafts.<br />
                  Real Stories.<br />
                  From India's Artisans to You.
                </h1>
                <p className="hero-subtitle">
                  Explore unique handmade products and<br />
                  support traditional artisans across India.
                </p>
                <div className="hero-search">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search handmade products..."
                  />
                </div>
              </div>
              <div className="hero-image">
                🏺
              </div>
            </div>

            {/* Featured Products */}
            <div className="products-section">
              <div className="section-header">
                <h2>Featured Products</h2>
                <a href="#" className="view-all">View All →</a>
              </div>
              <div className="products-grid">
                {filteredProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Artisan Story Card */}
            <div className="artisan-story-card">
              <div className="artisan-story-content">
                <div className="artisan-badge">✨ ARTISAN STORY</div>
                <h2 className="artisan-name">Meena Devi</h2>
                <p className="artisan-region">Rajasthan</p>
                <p className="artisan-description">
                  Creating beautiful hand-painted pottery using traditional techniques passed down for generations.
                </p>
                <button className="know-more-btn">Know More →</button>
              </div>
              <div className="artisan-avatar-large">
                👩‍🎨
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="why-choose-section">
              <div className="why-choose-content">
                <h3 className="why-choose-title">Why Choose KalaSetu?</h3>
                <div className="why-choose-items">
                  <div className="why-choose-item">
                    <span className="why-icon">👥</span>
                    <div>
                      <h4>Supports Traditional Artisans</h4>
                      <p>Direct connection with makers</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <span className="why-icon">✅</span>
                    <div>
                      <h4>Authentic & Handmade Products</h4>
                      <p>Verified by artisans</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <span className="why-icon">🔒</span>
                    <div>
                      <h4>Secure Payments</h4>
                      <p>Safe & encrypted</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <span className="why-icon">🚚</span>
                    <div>
                      <h4>Pan-India Delivery</h4>
                      <p>Fast & reliable shipping</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="why-choose-decoration">
                🌿
              </div>
            </div>

            {/* Recommended Section */}
            <div className="products-section">
              <div className="section-header">
                <h2>Recommended For You</h2>
                <a href="#" className="view-all">View All →</a>
              </div>
              <div className="products-grid products-grid-5">
                {filteredProducts.slice(4, 9).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
  