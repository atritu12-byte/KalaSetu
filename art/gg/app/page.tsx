'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Palette, ShoppingBag, Mic, Bot, Globe, Heart, TrendingUp, Users, Star, ArrowRight, Search, Sparkles, Sun, Moon } from 'lucide-react';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Handle intro animation completion
    const introTimer = setTimeout(() => {
      setIntroComplete(true);
    }, 3700); // Wait for all SVG animations to complete

    const hideIntroTimer = setTimeout(() => {
      setShowIntro(false);
    }, 5000); // Hide intro screen after smooth transition to corner

    return () => {
      clearTimeout(introTimer);
      clearTimeout(hideIntroTimer);
    };
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      {/* Full Screen Intro Animation */}
      {showIntro && (
        <div className={`logo-intro-screen ${introComplete ? 'hide' : ''}`}>
          <div className="logo-intro-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" role="img" aria-labelledby="title desc" className="logo-intro-svg">
              <title id="title">Kalasetu animated logo</title>
              <desc id="desc">A cultural bridge framing a terracotta pottery vessel, a flowing path and lotus leaves above the Kalasetu wordmark.</desc>

              <defs>
                <style>
                  {`
                    .green { fill:#173f35; }
                    .terracotta { fill:#bd5b2b; }
                    .cream { fill:#f8f3e8; }
                    .gold { fill:#c9822d; }

                    #bridge, #pot, #road, #leaves, #wordmark {
                      opacity:0;
                    }

                    #bridge {
                      transform-box: fill-box;
                      transform-origin:center;
                      animation: bridgeIn .8s cubic-bezier(.2,.8,.2,1) .1s forwards;
                    }

                    #pot {
                      transform-box: fill-box;
                      transform-origin:center;
                      animation: potIn .75s cubic-bezier(.2,.8,.2,1) .8s forwards;
                    }

                    #road {
                      transform-box: fill-box;
                      transform-origin:center bottom;
                      animation: roadIn .85s cubic-bezier(.2,.8,.2,1) 1.5s forwards;
                    }

                    #leaves {
                      transform-box: fill-box;
                      transform-origin:center bottom;
                      animation: leavesIn .75s cubic-bezier(.2,.8,.2,1) 2.2s forwards;
                    }

                    #wordmark {
                      transform-box: fill-box;
                      transform-origin:center;
                      animation: wordIn .9s cubic-bezier(.2,.8,.2,1) 2.9s forwards;
                    }

                    @keyframes bridgeIn {
                      from { opacity:0; transform:scale(.82); }
                      to   { opacity:1; transform:scale(1); }
                    }

                    @keyframes potIn {
                      from { opacity:0; transform:translateY(22px) scale(.82); }
                      to   { opacity:1; transform:translateY(0) scale(1); }
                    }

                    @keyframes roadIn {
                      from { opacity:0; transform:scaleY(0); }
                      to   { opacity:1; transform:scaleY(1); }
                    }

                    @keyframes leavesIn {
                      from { opacity:0; transform:translateY(15px) scale(.45) rotate(-7deg); }
                      to   { opacity:1; transform:translateY(0) scale(1) rotate(0); }
                    }

                    @keyframes wordIn {
                      from { opacity:0; transform:translateY(28px); }
                      to   { opacity:1; transform:translateY(0); }
                    }

                    @media (prefers-reduced-motion: reduce) {
                      #bridge, #pot, #road, #leaves, #wordmark {
                        animation:none !important;
                        opacity:1 !important;
                      }
                    }
                  `}
                </style>
              </defs>

              <g id="bridge" className="green">
                <path d="M155 286 C155 188 228 122 300 122 C372 122 445 188 445 286
                         L405 286 C405 211 356 169 300 169 C244 169 195 211 195 286 Z"/>
                <path d="M150 292 L204 292 L204 455 C204 475 192 492 168 501
                         L150 507 Z"/>
                <path d="M396 292 L450 292 L450 507 L432 501
                         C408 492 396 475 396 455 Z"/>
              </g>

              <g id="pot" className="terracotta">
                <path d="M255 245 Q300 231 345 245 L336 261
                         Q330 269 328 281 L272 281 Q270 269 264 261 Z"/>
                <path d="M272 281 Q300 292 328 281
                         L337 322 Q339 335 349 344
                         Q363 358 365 388
                         Q365 429 300 451
                         Q235 429 235 388
                         Q237 358 251 344
                         Q261 335 263 322 Z"/>
                <path d="M248 326 Q300 343 352 326 L356 342
                         Q300 361 244 342 Z" fill="#f8f3e8"/>
                <path d="M238 374 Q300 398 362 374 L362 388
                         Q300 414 238 388 Z" fill="#f8f3e8"/>
              </g>

              <g id="road" className="gold">
                <path d="M300 435
                         C332 447 365 459 382 478
                         C397 495 378 511 344 521
                         C304 533 263 541 222 559
                         C257 557 310 554 355 546
                         C411 536 452 515 449 491
                         C446 465 405 446 355 432 Z"/>
              </g>

              <g id="leaves" className="terracotta">
                <path d="M300 115 C276 91 277 60 300 33 C323 60 324 91 300 115 Z"/>
                <path d="M287 118 C256 113 235 92 233 62 C263 64 286 82 287 118 Z"/>
                <path d="M313 118 C344 113 365 92 367 62 C337 64 314 82 313 118 Z"/>
              </g>

              <g id="wordmark" className="green">
                <text x="300" y="625"
                      textAnchor="middle"
                      fontFamily="Georgia, 'Times New Roman', serif"
                      fontSize="86"
                      fontWeight="600"
                      letterSpacing="-3">Kalasetu</text>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Main Website Content */}
      <div className={`page-wrapper-fullscreen ${!showIntro ? 'visible' : ''}`}>
      {/* Enhanced Professional Header */}
      <header className="header-professional">
        <div className="container-full">
          <div className="header-content-professional">
            {/* Brand Logo & GI Registry Badge */}
            <div className="brand-section">
              <Link href="/" className="logo-professional">
                <div className="logo-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" role="img" aria-labelledby="title desc" style={{ height: '100px', width: 'auto' }}>
                    <title id="title">Kalasetu animated logo</title>
                    <desc id="desc">A cultural bridge framing a terracotta pottery vessel, a flowing path and lotus leaves above the Kalasetu wordmark.</desc>

                    <defs>
                      <style>
                        {`
                          .green { fill:#173f35; }
                          .terracotta { fill:#bd5b2b; }
                          .cream { fill:#f8f3e8; }
                          .gold { fill:#c9822d; }

                          #bridge, #pot, #road, #leaves, #wordmark {
                            opacity:0;
                          }

                          #bridge {
                            transform-box: fill-box;
                            transform-origin:center;
                            animation: bridgeIn .8s cubic-bezier(.2,.8,.2,1) .1s forwards;
                          }

                          #pot {
                            transform-box: fill-box;
                            transform-origin:center;
                            animation: potIn .75s cubic-bezier(.2,.8,.2,1) .8s forwards;
                          }

                          #road {
                            transform-box: fill-box;
                            transform-origin:center bottom;
                            animation: roadIn .85s cubic-bezier(.2,.8,.2,1) 1.5s forwards;
                          }

                          #leaves {
                            transform-box: fill-box;
                            transform-origin:center bottom;
                            animation: leavesIn .75s cubic-bezier(.2,.8,.2,1) 2.2s forwards;
                          }

                          #wordmark {
                            transform-box: fill-box;
                            transform-origin:center;
                            animation: wordIn .9s cubic-bezier(.2,.8,.2,1) 2.9s forwards;
                          }

                          @keyframes bridgeIn {
                            from { opacity:0; transform:scale(.82); }
                            to   { opacity:1; transform:scale(1); }
                          }

                          @keyframes potIn {
                            from { opacity:0; transform:translateY(22px) scale(.82); }
                            to   { opacity:1; transform:translateY(0) scale(1); }
                          }

                          @keyframes roadIn {
                            from { opacity:0; transform:scaleY(0); }
                            to   { opacity:1; transform:scaleY(1); }
                          }

                          @keyframes leavesIn {
                            from { opacity:0; transform:translateY(15px) scale(.45) rotate(-7deg); }
                            to   { opacity:1; transform:translateY(0) scale(1) rotate(0); }
                          }

                          @keyframes wordIn {
                            from { opacity:0; transform:translateY(28px); }
                            to   { opacity:1; transform:translateY(0); }
                          }

                          @media (prefers-reduced-motion: reduce) {
                            #bridge, #pot, #road, #leaves, #wordmark {
                              animation:none !important;
                              opacity:1 !important;
                            }
                          }
                        `}
                      </style>
                    </defs>

                    <g id="bridge" className="green">
                      <path d="M155 286 C155 188 228 122 300 122 C372 122 445 188 445 286
                               L405 286 C405 211 356 169 300 169 C244 169 195 211 195 286 Z"/>
                      <path d="M150 292 L204 292 L204 455 C204 475 192 492 168 501
                               L150 507 Z"/>
                      <path d="M396 292 L450 292 L450 507 L432 501
                               C408 492 396 475 396 455 Z"/>
                    </g>

                    <g id="pot" className="terracotta">
                      <path d="M255 245 Q300 231 345 245 L336 261
                               Q330 269 328 281 L272 281 Q270 269 264 261 Z"/>
                      <path d="M272 281 Q300 292 328 281
                               L337 322 Q339 335 349 344
                               Q363 358 365 388
                               Q365 429 300 451
                               Q235 429 235 388
                               Q237 358 251 344
                               Q261 335 263 322 Z"/>
                      <path d="M248 326 Q300 343 352 326 L356 342
                               Q300 361 244 342 Z" fill="#f8f3e8"/>
                      <path d="M238 374 Q300 398 362 374 L362 388
                               Q300 414 238 388 Z" fill="#f8f3e8"/>
                    </g>

                    <g id="road" className="gold">
                      <path d="M300 435
                               C332 447 365 459 382 478
                               C397 495 378 511 344 521
                               C304 533 263 541 222 559
                               C257 557 310 554 355 546
                               C411 536 452 515 449 491
                               C446 465 405 446 355 432 Z"/>
                    </g>

                    <g id="leaves" className="terracotta">
                      <path d="M300 115 C276 91 277 60 300 33 C323 60 324 91 300 115 Z"/>
                      <path d="M287 118 C256 113 235 92 233 62 C263 64 286 82 287 118 Z"/>
                      <path d="M313 118 C344 113 365 92 367 62 C337 64 314 82 313 118 Z"/>
                    </g>

                    <g id="wordmark" className="green">
                      <text x="300" y="625"
                            textAnchor="middle"
                            fontFamily="Georgia, 'Times New Roman', serif"
                            fontSize="86"
                            fontWeight="600"
                            letterSpacing="-3">Kalasetu</text>
                    </g>
                  </svg>
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
                  placeholder="Search certified GI crafts, master guilds, or techniques..."
                  className="search-input-professional"
                />
                <Search className="search-icon-professional" />
                <div className="search-actions">
                  <button title="Voice Search" className="search-action-btn">
                    <Mic size={16} />
                  </button>
                  <button title="Image Scan" className="search-action-btn">
                    <Bot size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions & Language */}
            <div className="header-actions">
              <div className="nav-links">
                <Link href="/collections" className="nav-link">Collections</Link>
                <Link href="/heritage" className="nav-link">Heritage</Link>
                <Link href="/artisans" className="nav-link">Artisans</Link>
              </div>
              
              <div className="action-buttons">
                <button 
                  onClick={toggleTheme}
                  className="theme-toggle-btn"
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button className="action-btn">
                  <Heart size={20} />
                </button>
                <button className="action-btn cart-btn">
                  <ShoppingBag size={20} />
                  <span className="cart-count">3</span>
                </button>
                <button className="action-btn">
                  <Users size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Impact Ticker */}
      <div className="impact-ticker">
        <div className="container-full">
          <div className="ticker-content">
            <div className="ticker-left">
              <span className="status-indicator"></span>
              <span className="ticker-label">LIVE IMPACT REGISTRY:</span>
              <span className="ticker-text">Empowering generational ateliers via verifiable fair remuneration.</span>
            </div>
            <div className="ticker-stats">
              <span className="stat-item">
                ₹1.48 Cr <span className="stat-label">DIRECT TO RURAL MAKERS</span>
              </span>
              <span className="stat-item">
                3,420 <span className="stat-label">HERITAGE LINEAGES PRESERVED</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content-enhanced">
        <div className="container-full">
          {/* Hero Section with Conversational Discovery */}
          <section className="hero-professional">
            <div className="hero-grid">
              <div className="hero-content">
                <span className="hero-tagline">The Archival Craft Depository</span>
                <h1 className="hero-title-professional">
                  Preserving Heritage, <br />
                  <span className="hero-subtitle">Empowering Hands.</span>
                </h1>
                <p className="hero-description-professional">
                  Direct patronage to verified Geographical Indication (GI) custodians across the subcontinent. 
                  Zero middlemen markups, immutable lineage attribution, and pure indigenous artistry.
                </p>

                {/* Conversational Voice Search */}
                <div className="voice-search-container">
                  <button className="voice-btn-professional">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </button>
                  <div className="voice-input-area">
                    <span className="voice-label">Conversational Query</span>
                    <input 
                      type="text" 
                      defaultValue="Find me an indigo block print dupatta under ₹2,500..." 
                      className="voice-input-professional"
                    />
                  </div>
                  <span className="audio-status">
                    <span className="status-dot"></span> Audio Model Active
                  </span>
                  <button className="discover-btn-professional">
                    Discover
                  </button>
                </div>

                <div className="quick-queries">
                  <span className="queries-label">Try Inquiring:</span>
                  <button className="query-pill">
                    "Dhokra bell metal chime under ₹3,500"
                  </button>
                  <button className="query-pill">
                    "Pashmina shawl Srinagar lineage"
                  </button>
                </div>
              </div>

              {/* Enhanced Vision Dropzone */}
              <div className="vision-dropzone">
                <div className="dropzone-header">
                  <div className="dropzone-title">
                    <Sparkles size={16} />
                    <span>Kala-Lens Identification</span>
                  </div>
                  <span className="patent-badge">Patent Pending</span>
                </div>

                <div className="dropzone-area">
                  <div className="dropzone-icon">
                    <Bot size={24} />
                  </div>
                  <div className="dropzone-content">
                    <p className="dropzone-title-text">Snap or upload any craft motif</p>
                    <p className="dropzone-description">
                      Our vision neural-net extracts weave densities, clay slips, and mineral dyes to identify origin guilds.
                    </p>
                  </div>
                  <button className="camera-scan-btn">
                    Initiate Camera Scan
                  </button>
                </div>

                <div className="dropzone-footer">
                  <span className="verification-badge">
                    <Globe size={14} /> 100% Provenance Verification
                  </span>
                  <span className="signature-count">14,200+ Craft Signatures</span>
                </div>
              </div>
            </div>
          </section>

          {/* Role Selection Cards - Main Feature */}
          <section className="role-cards">
            {/* Seller/Artisan Card */}
            <Link href="/seller" className="card card-hero theme-seller" style={{ 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #4caf50 0%, #ffb300 100%)',
              color: 'white',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <Palette size={80} style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '1rem', color: 'white' }}>
                  I'm a Seller/Artisan
                </h2>
                <p style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  marginBottom: '2rem', 
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: '1.6' 
                }}>
                  Sell your beautiful crafts with just your voice. Create professional 
                  listings easily, get AI assistance, and reach customers worldwide.
                </p>
                <div className="btn btn-secondary" style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  border: '2px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Palette size={20} />
                  Enter Artisan Studio
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>

            {/* Buyer Card */}
            <Link href="/buyer" className="card card-hero theme-buyer" style={{ 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #ea580c 0%, #ec4899 100%)',
              color: 'white',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <ShoppingBag size={80} style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '1rem', color: 'white' }}>
                  I'm here to Shop
                </h2>
                <p style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  marginBottom: '2rem', 
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: '1.6' 
                }}>
                  Discover authentic handmade crafts from talented traditional artisans. 
                  Support cultural heritage while finding unique treasures.
                </p>
                <div className="btn btn-secondary" style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  border: '2px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <ShoppingBag size={20} />
                  Start Shopping
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </section>

          {/* Key Features Section */}
          <section>
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: 'var(--spacing-2xl)',
              color: 'var(--sage-900)',
              fontWeight: '700',
              fontSize: '2.5rem'
            }}>
              Key Features
            </h2>
            <div className="card-grid">
              <div className="card">
                <div style={{ textAlign: 'center' }}>
                  <div className="category-icon"><Mic /></div>
                  <h3>Voice-First Interface</h3>
                  <p>
                    Speak in your own language - Hindi, English, Tamil, Bengali, Marathi, or Gujarati. 
                    No typing skills needed. Just take a photo and describe your craft.
                  </p>
                </div>
              </div>

              <div className="card">
                <div style={{ textAlign: 'center' }}>
                  <div className="category-icon"><Bot /></div>
                  <h3>AI-Powered Listings</h3>
                  <p>
                    Our AI analyzes your product photo and voice description to create professional 
                    listings with translations, pricing suggestions, and market insights.
                  </p>
                </div>
              </div>

              <div className="card">
                <div style={{ textAlign: 'center' }}>
                  <div className="category-icon"><Globe /></div>
                  <h3>Global Marketplace</h3>
                  <p>
                    Connect traditional artisans with buyers worldwide. Preserve cultural heritage 
                    while expanding markets and creating better income opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How it Helps Section */}
          <section className="card" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--sage-900)',
              fontWeight: '700',
              fontSize: '2.5rem'
            }}>
              How KalaSetu Helps
            </h2>
            
            <div className="card-grid">
              <div>
                <h3 style={{ color: 'var(--sage-900)', marginBottom: 'var(--spacing-md)', fontWeight: '700' }}>
                  <Users size={24} style={{ marginRight: '0.5rem' }} />
                  For Artisans
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  color: 'var(--sage-800)',
                  fontWeight: '600'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Makes online selling easier</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Reduces need for typing and technical knowledge</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Supports local languages and voice input</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Helps create professional product listings</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Connects them with more customers</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: 'var(--sage-900)', marginBottom: 'var(--spacing-md)', fontWeight: '700' }}>
                  <Heart size={24} style={{ marginRight: '0.5rem' }} />
                  For Buyers
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  color: 'var(--sage-800)',
                  fontWeight: '600'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Encourages traditional arts and crafts</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Provides searches and recommendations</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Learn about artisans and their life stories</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Makes purchasing handmade products convenient</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Supports cultural heritage preservation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Traditional Crafts</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">200+</span>
              <span className="stat-label">Artisan Communities</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">6</span>
              <span className="stat-label">Languages Supported</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Products Listed</span>
            </div>
          </section>

          {/* Future Outcomes */}
          <section className="card">
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--sage-900)',
              fontWeight: '700',
              fontSize: '2.5rem'
            }}>
              Future Outcomes
            </h2>
            <div className="card-grid">
              <div style={{ textAlign: 'center' }}>
                <TrendingUp size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
                <h4>Reach Global Markets</h4>
                <p>Help artisans reach national and international markets</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Star size={48} style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }} />
                <h4>Better Income</h4>
                <p>Create better income opportunities for traditional artisans</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Globe size={48} style={{ color: 'var(--accent-tertiary)', marginBottom: '1rem' }} />
                <h4>Cultural Heritage</h4>
                <p>Help preserve traditional crafts and cultural heritage</p>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="card card-hero" style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--spacing-lg)' }}>Our Mission</h2>
            <p style={{ 
              fontSize: 'var(--font-size-xl)', 
              color: 'rgba(255,255,255,0.95)', 
              maxWidth: '800px', 
              margin: '0 auto', 
              lineHeight: '1.7',
              fontStyle: 'italic'
            }}>
              "KalaSetu uses AI to bridge the gap between traditional artisans and the 
              digital marketplace, helping artisans reach more customers while helping 
              buyers discover and support traditional crafts that preserve our cultural heritage."
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: 'var(--bg-secondary)', 
        padding: 'var(--spacing-2xl) 0', 
        textAlign: 'center',
        borderTop: '3px solid var(--border-color)'
      }}>
        <div className="container">
          <p style={{ 
            color: 'var(--sage-800)', 
            fontWeight: '600',
            fontSize: 'var(--font-size-lg)',
            marginBottom: 'var(--spacing-sm)' 
          }}>
            © 2024 KalaSetu - Empowering Traditional Artisans with AI Technology
          </p>
          <p style={{ color: 'var(--sage-700)', fontSize: 'var(--font-size-sm)', fontWeight: '500' }}>
            Supporting cultural heritage • Bridging tradition with technology • Creating opportunities
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
