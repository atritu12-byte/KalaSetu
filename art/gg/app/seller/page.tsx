'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Package, BarChart3, MessageSquare, Settings, Mic, Upload, Send, X, CheckCircle, AlertCircle, Volume2, Loader } from 'lucide-react';
import { uploadImageToCloudinary, validateCloudinaryConfig } from '@/lib/cloudinary';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState(1); // 1: Photo/Input, 2: Review AI Output
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionLanguage, setRecognitionLanguage] = useState('hi-IN'); // Hindi by default
  const [translatedText, setTranslatedText] = useState('');
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [productInput, setProductInput] = useState({ 
    name: '', 
    voiceDescription: '', 
    category: '', 
    tags: '', 
    price: '',
    image: null as File | null,
    imageUrl: '' as string,
    previewUrl: '' as string
  });
  const [aiGeneratedProduct, setAiGeneratedProduct] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [cloudinaryConfigValid, setCloudinaryConfigValid] = useState(true);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('sellerProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    // Validate Cloudinary configuration
    if (!validateCloudinaryConfig()) {
      setCloudinaryConfigValid(false);
      console.warn('Cloudinary not properly configured');
    }

    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = async (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        
        for (let i = event.results.length - 1; i >= 0; i--) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            // Translate final transcript to English
            await translateToEnglish(transcript);
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Translate text to English using Google Translate API (free alternative)
  const translateToEnglish = async (text: string) => {
    try {
      // Using MyMemory Translation API (free, no API key required)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${recognitionLanguage.split('-')[0]}|en`
      );
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        const translated = data.responseData.translatedText;
        setTranslatedText(translated);
        // Append to description
        setProductInput(prev => ({
          ...prev,
          voiceDescription: prev.voiceDescription 
            ? prev.voiceDescription + ' ' + translated 
            : translated
        }));
      }
    } catch (error) {
      console.error('Translation error:', error);
      // If translation fails, use original text
      setProductInput(prev => ({
        ...prev,
        voiceDescription: prev.voiceDescription 
          ? prev.voiceDescription + ' ' + text 
          : text
      }));
    }
  };

  // Handle file selection for image upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setProductInput(prev => ({
      ...prev,
      image: file,
      previewUrl: previewUrl
    }));
    setUploadError('');
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProductInput(prev => ({
        ...prev,
        image: file,
        previewUrl: previewUrl
      }));
      setUploadError('');
    }
  };

  // Upload image to Cloudinary
  const handleImageUpload = async () => {
    if (!productInput.image) {
      setUploadError('Please select an image first');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const response = await uploadImageToCloudinary(
        productInput.image,
        (progress) => {
          setUploadProgress(progress.percent);
        }
      );

      // Update product input with uploaded image URL
      setProductInput(prev => ({
        ...prev,
        imageUrl: response.secure_url
      }));

      setIsUploading(false);
      setUploadProgress(0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadError(errorMessage);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Save products to localStorage
  const saveProducts = (updatedProducts: any[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('sellerProducts', JSON.stringify(updatedProducts));
  };

  // AI creates product from seller input
  const generateAIProduct = () => {
    if (!productInput.name || !productInput.voiceDescription) {
      alert('Please enter product name and description');
      return;
    }

    // Simulate AI processing
    const aiGenerated = {
      name: productInput.name,
      description: productInput.voiceDescription,
      category: productInput.category || 'Traditional Crafts',
      tags: productInput.tags ? productInput.tags.split(',').map(t => t.trim()) : ['Handmade', 'Traditional'],
      price: productInput.price || '₹0',
      image: productInput.imageUrl || null,
      previewUrl: productInput.previewUrl || null,
      // AI generated fields
      aiSuggestions: {
        priceRange: `₹${Math.max(500, parseInt(productInput.price || '0') - 500)} - ₹${parseInt(productInput.price || '1000') + 1000}`,
        marketDemand: 'High',
        suggestedTags: ['Artisan', 'Eco-friendly', 'Handcrafted'],
        improvementTips: [
          'Add more details about the crafting process',
          'Mention the materials used',
          'Highlight unique features that set it apart'
        ]
      }
    };

    setAiGeneratedProduct(aiGenerated);
    setUploadStep(2);
  };

  // Publish AI-generated product
  const publishAIProduct = () => {
    const newProduct = {
      id: Date.now(),
      ...aiGeneratedProduct,
      status: 'published',
      createdAt: new Date().toLocaleDateString(),
      views: 0,
      orders: 0
    };

    saveProducts([...products, newProduct]);
    
    // Reset form
    setShowUploadModal(false);
    setUploadStep(1);
    setProductInput({ name: '', voiceDescription: '', category: '', tags: '', price: '', image: null, imageUrl: '', previewUrl: '' });
    setAiGeneratedProduct(null);
  };

  // Start voice recording with language support
  const startVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('❌ Speech Recognition not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Set the language for recognition
    recognitionRef.current.lang = recognitionLanguage;
    recognitionRef.current.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Publish product
  const publishProduct = (id: number) => {
    const updated = products.map(p => p.id === id ? { ...p, status: 'published' } : p);
    saveProducts(updated);
  };

  // Delete product
  const deleteProduct = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
  };

  const publishedCount = products.filter(p => p.status === 'published').length;
  const draftCount = products.filter(p => p.status === 'draft').length;
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const totalOrders = products.reduce((sum, p) => sum + p.orders, 0);

  return (
    <div className="page-wrapper-fullscreen">
      <header className="header-professional">
        <div className="container-full">
          <div className="header-content-professional">
            <Link href="/" className="btn btn-secondary switch-role-btn">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <h1 style={{ color: 'var(--sage-900)', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>🎨 Artisan Studio</h1>
            </div>
            <div style={{ width: '120px' }}></div>
          </div>
        </div>
      </header>

      {/* Dashboard Tabs */}
      <div className="seller-tabs">
        <button 
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={20} /> Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={20} /> My Products ({products.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={20} /> AI Assistant
        </button>
      </div>

      <main className="seller-main-content">
        <div className="container-full">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="seller-dashboard-section">
              <h2 style={{ color: 'var(--sage-900)', marginBottom: '2rem', fontSize: '1.8rem' }}>Welcome Back! 👋</h2>
              
              {/* Stats Cards */}
              <div className="seller-stats-grid">
                <div className="seller-stat-card">
                  <div className="stat-number">{publishedCount}</div>
                  <div className="stat-label">Published Products</div>
                </div>
                <div className="seller-stat-card">
                  <div className="stat-number">{draftCount}</div>
                  <div className="stat-label">Draft Products</div>
                </div>
                <div className="seller-stat-card">
                  <div className="stat-number">{totalViews}</div>
                  <div className="stat-label">Total Views</div>
                </div>
                <div className="seller-stat-card">
                  <div className="stat-number">{totalOrders}</div>
                  <div className="stat-label">Total Orders</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ color: 'var(--sage-900)', marginBottom: '1.5rem', fontWeight: '600' }}>Quick Actions</h3>
                <button 
                  className="btn btn-primary"
                  onClick={() => { setShowUploadModal(true); setUploadStep(1); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}
                >
                  <Plus size={20} /> Add New Product
                </button>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="seller-products-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--sage-900)', margin: 0, fontSize: '1.8rem' }}>My Products</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => { setShowUploadModal(true); setUploadStep(1); }}
                >
                  <Plus size={20} /> New Product
                </button>
              </div>

              {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--sage-700)' }}>
                  <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                  <p>No products yet. Create your first product listing!</p>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-header">
                        <h3 style={{ margin: 0, color: 'var(--sage-900)', fontSize: '1.1rem' }}>{product.name}</h3>
                        <span className={`status-badge ${product.status}`}>{product.status}</span>
                      </div>
                      <p style={{ color: 'var(--sage-700)', fontSize: '0.9rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{product.description.substring(0, 100)}...</p>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sage-600)', marginBottom: '1rem', display: 'grid', gap: '0.25rem' }}>
                        <div><strong>Category:</strong> {product.category}</div>
                        <div><strong>Price:</strong> {product.price}</div>
                        <div><strong>Views:</strong> {product.views} | <strong>Orders:</strong> {product.orders}</div>
                        <div style={{ color: 'var(--sage-500)', fontSize: '0.8rem' }}>Created: {product.createdAt}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        {product.tags && product.tags.map((tag: string, i: number) => (
                          <span key={i} style={{ 
                            background: 'var(--sage-100)', 
                            color: 'var(--sage-700)', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '20px',
                            fontSize: '0.75rem'
                          }}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {product.status === 'draft' && (
                          <button 
                            className="btn-small btn-primary"
                            onClick={() => publishProduct(product.id)}
                          >
                            Publish
                          </button>
                        )}
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Assistant Tab */}
          {activeTab === 'chat' && (
            <div className="seller-chat-section">
              <h2 style={{ color: 'var(--sage-900)', marginBottom: '2rem', fontSize: '1.8rem' }}>🤖 AI Assistant</h2>
              <div className="chat-container">
                <div className="chat-messages">
                  <div className="chat-message assistant">
                    <p><strong>Hello! I'm your AI Assistant 🎨</strong></p>
                    <p>I can help you with:</p>
                    <ul style={{ color: 'var(--sage-800)', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>💰 <strong>Price Range Guidance</strong> - Get optimal pricing for your products</li>
                      <li>📊 <strong>Market Demand Insights</strong> - Know what's trending in your category</li>
                      <li>📝 <strong>Product Recommendations</strong> - Ideas for new products based on demand</li>
                      <li>🎯 <strong>Selling Tips</strong> - Best practices to increase sales</li>
                    </ul>
                  </div>

                  {products.length > 0 && (
                    <div className="chat-message assistant">
                      <p><strong>📈 Your Performance This Month:</strong></p>
                      <ul style={{ color: 'var(--sage-800)', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                        <li>Published Products: {publishedCount}</li>
                        <li>Total Views: {totalViews}</li>
                        <li>Total Orders: {totalOrders}</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="chat-input-area">
                  <input 
                    type="text" 
                    placeholder="Ask me about pricing, market trends, or selling tips..."
                    className="chat-input"
                  />
                  <button className="chat-send-btn">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal - Multi-Step */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => { setShowUploadModal(false); setUploadStep(1); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: 'var(--sage-900)' }}>
                {uploadStep === 1 && '📸 Create Product Listing'}
                {uploadStep === 2 && '✨ Review AI Generated Product'}
              </h2>
              <button 
                className="modal-close-btn"
                onClick={() => { setShowUploadModal(false); setUploadStep(1); }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Step Indicator */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
              {[1, 2].map(step => (
                <div 
                  key={step}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    background: step <= uploadStep ? 'var(--sage-700)' : 'var(--sage-200)',
                    color: step <= uploadStep ? 'white' : 'var(--sage-700)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1: Input Form */}
            {uploadStep === 1 && (
              <div className="upload-steps">
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    📷 Product Photo (Upload to Cloudinary)
                  </label>
                  
                  <div
                    style={{
                      border: '2px dashed var(--sage-300)',
                      borderRadius: '0.75rem',
                      padding: '2rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: productInput.previewUrl ? 'var(--sage-100)' : 'var(--sage-50)',
                      borderColor: productInput.imageUrl ? '#10b981' : 'var(--sage-300)'
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                      style={{ display: 'none' }}
                    />
                    
                    {productInput.previewUrl ? (
                      <div>
                        <div
                          style={{
                            width: '100%',
                            height: '200px',
                            backgroundImage: `url(${productInput.previewUrl})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            marginBottom: '1rem',
                            borderRadius: '0.5rem'
                          }}
                        />
                        <p style={{ color: 'var(--sage-700)', fontWeight: '600', margin: '0.5rem 0' }}>
                          {productInput.image?.name}
                        </p>
                        <p style={{ color: 'var(--sage-600)', fontSize: '0.9rem', margin: 0 }}>
                          Click to change or drag a new image
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload size={32} style={{ color: 'var(--sage-700)', marginBottom: '0.5rem' }} />
                        <p style={{ color: 'var(--sage-700)', fontWeight: '600', margin: '0.5rem 0' }}>Click to upload or drag & drop</p>
                        <p style={{ color: 'var(--sage-600)', fontSize: '0.9rem' }}>(JPEG, PNG, WebP, GIF - Max 10MB)</p>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <div style={{
                      background: '#fee2e2',
                      border: '1px solid #fca5a5',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      marginTop: '0.75rem',
                      color: '#991b1b',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <AlertCircle size={18} />
                      {uploadError}
                    </div>
                  )}

                  {productInput.previewUrl && !productInput.imageUrl && (
                    <button
                      onClick={handleImageUpload}
                      disabled={isUploading}
                      style={{
                        marginTop: '1rem',
                        width: '100%',
                        padding: '0.75rem',
                        background: isUploading ? 'var(--sage-400)' : 'var(--sage-700)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {isUploading ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Uploading... {uploadProgress}%
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload to Cloudinary
                        </>
                      )}
                    </button>
                  )}

                  {productInput.imageUrl && (
                    <div style={{
                      background: '#d1fae5',
                      border: '1px solid #6ee7b7',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      marginTop: '0.75rem',
                      color: '#065f46',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <CheckCircle size={18} />
                      <span><strong>✅ Image uploaded successfully!</strong></span>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    🏷️ Product Name
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g., Traditional Blue Pottery Vase"
                    value={productInput.name}
                    onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    🌐 Select Language for Voice Input
                  </label>
                  <select 
                    value={recognitionLanguage}
                    onChange={(e) => setRecognitionLanguage(e.target.value)}
                    className="form-input"
                    disabled={isRecording}
                  >
                    <option value="hi-IN">🇮🇳 Hindi (हिंदी)</option>
                    <option value="ta-IN">🇮🇳 Tamil (தமிழ்)</option>
                    <option value="te-IN">🇮🇳 Telugu (తెలుగు)</option>
                    <option value="ml-IN">🇮🇳 Malayalam (മലയാളം)</option>
                    <option value="gu-IN">🇮🇳 Gujarati (ગુજરાતી)</option>
                    <option value="kn-IN">🇮🇳 Kannada (ಕನ್ನಡ)</option>
                    <option value="bn-IN">🇮🇳 Bengali (বাংলা)</option>
                    <option value="pa-IN">🇮🇳 Punjabi (ਪੰਜਾਬੀ)</option>
                    <option value="en-US">🇺🇸 English (US)</option>
                    <option value="en-GB">🇬🇧 English (UK)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    🎤 Describe Your Product (Voice or Text)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <button 
                      className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`}
                      onClick={() => isRecording ? stopVoiceRecording() : startVoiceRecording()}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
                    >
                      <Mic size={18} /> {isRecording ? 'Stop Recording' : 'Record Voice'}
                    </button>
                    <span style={{ padding: '0.75rem', color: isRecording ? '#dc2626' : 'var(--sage-700)', alignSelf: 'center', fontWeight: '600' }}>
                      {isRecording && '🔴 Recording...'}
                      {!isRecording && translatedText && '✅ Translated'}
                    </span>
                  </div>
                  
                  {translatedText && (
                    <div style={{
                      background: '#d1fae5',
                      border: '1px solid #6ee7b7',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      color: '#065f46'
                    }}>
                      <strong>Last translated:</strong> {translatedText}
                    </div>
                  )}
                  
                  <textarea
                    placeholder="Describe your product in detail... Speak in your local language (Hindi, Tamil, Telugu, etc.) or type directly. Speech will be auto-translated to English."
                    value={productInput.voiceDescription}
                    onChange={(e) => setProductInput({ ...productInput, voiceDescription: e.target.value })}
                    className="form-textarea"
                    rows={4}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    📂 Category
                  </label>
                  <select 
                    value={productInput.category}
                    onChange={(e) => setProductInput({ ...productInput, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Select Category</option>
                    <option value="Pottery">🏺 Pottery</option>
                    <option value="Textiles">🧵 Textiles</option>
                    <option value="Metalwork">⚒️ Metalwork</option>
                    <option value="Woodcraft">🪵 Woodcraft</option>
                    <option value="Jewelry">💎 Jewelry</option>
                    <option value="Art">🎭 Art</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    🏷️ Tags (comma separated)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g., Handmade, Traditional, Ceramic"
                    value={productInput.tags}
                    onChange={(e) => setProductInput({ ...productInput, tags: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--sage-900)' }}>
                    💰 Price in ₹
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter price"
                    value={productInput.price}
                    onChange={(e) => setProductInput({ ...productInput, price: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Step 2: AI Review & Approval */}
            {uploadStep === 2 && aiGeneratedProduct && (
              <div className="ai-review-section">
                <div style={{ background: 'var(--sage-50)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--sage-900)', marginTop: 0 }}>✨ AI Generated Product Details</h3>
                  
                  {(aiGeneratedProduct.image || aiGeneratedProduct.previewUrl) && (
                    <div style={{
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>
                      <div
                        style={{
                          width: '100%',
                          height: '250px',
                          backgroundImage: `url(${aiGeneratedProduct.image || aiGeneratedProduct.previewUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '0.5rem',
                          marginBottom: '0.5rem'
                        }}
                      />
                      <p style={{ fontSize: '0.9rem', color: 'var(--sage-600)', margin: 0 }}>Product Image Preview</p>
                    </div>
                  )}
                  
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    <p><strong>Product Name:</strong> {aiGeneratedProduct.name}</p>
                    <p><strong>Category:</strong> {aiGeneratedProduct.category}</p>
                    <p><strong>Description:</strong> {aiGeneratedProduct.description}</p>
                    <p><strong>Price:</strong> {aiGeneratedProduct.price}</p>
                    <div>
                      <strong>Tags:</strong>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        {aiGeneratedProduct.tags.map((tag: string, i: number) => (
                          <span key={i} style={{ 
                            background: 'var(--sage-700)', 
                            color: 'white', 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '20px',
                            fontSize: '0.85rem'
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #fcd34d' }}>
                    <h4 style={{ color: '#92400e', marginTop: 0 }}>💡 AI Suggestions</h4>
                    <p><strong>Recommended Price Range:</strong> {aiGeneratedProduct.aiSuggestions.priceRange}</p>
                    <p><strong>Market Demand:</strong> {aiGeneratedProduct.aiSuggestions.marketDemand}</p>
                    <p><strong>Suggested Additional Tags:</strong> {aiGeneratedProduct.aiSuggestions.suggestedTags.join(', ')}</p>
                    <div>
                      <strong>Improvement Tips:</strong>
                      <ul style={{ marginTop: '0.5rem', color: '#92400e' }}>
                        {aiGeneratedProduct.aiSuggestions.improvementTips.map((tip: string, i: number) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setUploadStep(1)}
                  >
                    ← Back to Edit
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={publishAIProduct}
                  >
                    <CheckCircle size={20} /> Publish Product
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons for Step 1 */}
            {uploadStep === 1 && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => { setShowUploadModal(false); setUploadStep(1); }}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={generateAIProduct}
                >
                  Next: AI Review →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}