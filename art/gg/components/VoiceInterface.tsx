'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { supportedLanguages, speechToText } from '../lib/data';

interface VoiceInterfaceProps {
  onVoiceResult: (text: string, language: string) => void;
  language?: string;
  isEnabled?: boolean;
  placeholder?: string;
}

export default function VoiceInterface({ 
  onVoiceResult, 
  language = 'en-IN', 
  isEnabled = true,
  placeholder = "Click to speak..."
}: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          onVoiceResult(finalTranscript, language);
        }
      };

      recognition.onerror = (event: any) => {
        setError(`Voice recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onVoiceResult]);

  const startListening = () => {
    if (!isSupported) {
      // Fallback for unsupported browsers - use mock function
      handleMockVoiceInput();
      return;
    }

    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError('');
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleMockVoiceInput = async () => {
    setIsListening(true);
    
    try {
      // Use our mock speech-to-text function
      const mockText = await speechToText(null, language);
      setTranscript(mockText);
      onVoiceResult(mockText, language);
    } catch (error) {
      setError('Mock voice input failed');
    }
    
    setIsListening(false);
  };

  const getCurrentLanguage = () => {
    return supportedLanguages.find(lang => lang.code === language);
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 'var(--spacing-md)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <button 
          className={`voice-button ${isListening ? 'recording' : ''}`}
          onClick={isListening ? stopListening : startListening}
          disabled={!isEnabled}
          title={isSupported ? 'Voice Recognition Available' : 'Using Mock Voice (Browser not supported)'}
        >
          {isListening ? <MicOff /> : <Mic />}
        </button>
        
        <p style={{ 
          marginTop: 'var(--spacing-sm)', 
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)'
        }}>
          {isListening ? 'Listening...' : placeholder}
        </p>
        
        {getCurrentLanguage() && (
          <p style={{ 
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-secondary)'
          }}>
            Language: {getCurrentLanguage()?.native}
          </p>
        )}
      </div>

      {transcript && (
        <div className="card" style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h5>Voice Input:</h5>
          <p style={{ 
            fontStyle: 'italic',
            padding: 'var(--spacing-md)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--border-radius)',
            border: '2px solid var(--border-color)'
          }}>
            "{transcript}"
          </p>
        </div>
      )}

      {error && (
        <div style={{ 
          color: 'var(--error-color)',
          fontSize: 'var(--font-size-sm)',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {!isSupported && (
        <div style={{ 
          fontSize: 'var(--font-size-xs)',
          color: 'var(--warning-color)',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          ℹ️ Voice recognition not supported in your browser. Using demo mode.
        </div>
      )}
    </div>
  );
}

// Voice Navigation Component
interface VoiceNavigationProps {
  onNavigate: (destination: string) => void;
  availableDestinations: { name: string; label: string }[];
}

export function VoiceNavigation({ onNavigate, availableDestinations }: VoiceNavigationProps) {
  const [isActive, setIsActive] = useState(false);

  const handleVoiceNavigation = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Navigation keywords
    const navigationMap = {
      'dashboard': 'dashboard',
      'home': 'dashboard', 
      'assistant': 'assistant',
      'ai': 'assistant',
      'help': 'help',
      'roadmap': 'roadmap',
      'shop': 'shop',
      'shopping': 'shop',
      'buy': 'shop',
      'wishlist': 'wishlist',
      'wish': 'wishlist',
      'cart': 'cart',
      'basket': 'cart',
      'impact': 'impact'
    };

    for (const [keyword, destination] of Object.entries(navigationMap)) {
      if (lowerText.includes(keyword)) {
        onNavigate(destination);
        setIsActive(false);
        break;
      }
    }
  };

  return (
    <div className="floating-button" 
      style={{ 
        bottom: '90px',
        background: 'var(--accent-secondary)',
        boxShadow: '0 8px 25px var(--shadow-color)'
      }}
      title="Voice Navigation"
    >
      {isActive ? (
        <VoiceInterface
          onVoiceResult={handleVoiceNavigation}
          placeholder="Say where to go..."
        />
      ) : (
        <button 
          style={{ 
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: 'var(--font-size-xl)'
          }}
          onClick={() => setIsActive(!isActive)}
        >
          <Volume2 />
        </button>
      )}
    </div>
  );
}