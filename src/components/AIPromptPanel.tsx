import React, { useState } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface AIPromptPanelProps {
  show: boolean;
  onClose: () => void;
}

export const AIPromptPanel: React.FC<AIPromptPanelProps> = ({ show, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { addElement, setCanvasSize, setCanvasBackground } = useEditorStore();

  if (!show) return null;

  const generateDesignFromPrompt = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Parse prompt and generate design
    const lowerPrompt = prompt.toLowerCase();
    
    // Detect design type
    let width = 1080;
    let height = 1080;
    let background = '#ffffff';
    
    if (lowerPrompt.includes('instagram post')) {
      width = 1080;
      height = 1080;
    } else if (lowerPrompt.includes('instagram story')) {
      width = 1080;
      height = 1920;
    } else if (lowerPrompt.includes('youtube thumbnail')) {
      width = 1280;
      height = 720;
    } else if (lowerPrompt.includes('presentation')) {
      width = 1920;
      height = 1080;
    }

    // Detect color theme
    if (lowerPrompt.includes('dark') || lowerPrompt.includes('night')) {
      background = '#0a0a0f';
    } else if (lowerPrompt.includes('blue') || lowerPrompt.includes('ocean') || lowerPrompt.includes('beach')) {
      background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else if (lowerPrompt.includes('summer') || lowerPrompt.includes('sunset')) {
      background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    } else if (lowerPrompt.includes('nature') || lowerPrompt.includes('green')) {
      background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    } else if (lowerPrompt.includes('professional') || lowerPrompt.includes('business')) {
      background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    // Clear existing elements and set view
    useEditorStore.getState().clearCanvas();
    useEditorStore.getState().setView('editor');
    
    // Set canvas
    setCanvasSize(width, height);
    setCanvasBackground(background);

    // Extract main text from prompt
    const words = prompt.split(' ');
    let mainText = 'YOUR TITLE HERE';
    const subText = 'Subtitle';

    // Try to extract meaningful text
    if (lowerPrompt.includes('about')) {
      const aboutIndex = words.findIndex(w => w.toLowerCase() === 'about');
      if (aboutIndex !== -1 && aboutIndex < words.length - 1) {
        mainText = words.slice(aboutIndex + 1, aboutIndex + 4).join(' ').toUpperCase();
      }
    } else if (lowerPrompt.includes('for')) {
      const forIndex = words.findIndex(w => w.toLowerCase() === 'for');
      if (forIndex !== -1 && forIndex < words.length - 1) {
        mainText = words.slice(forIndex + 1, forIndex + 4).join(' ').toUpperCase();
      }
    }

    // Add decorative elements
    if (lowerPrompt.includes('minimal') || lowerPrompt.includes('simple')) {
      // Simple design
      addElement({
        type: 'text',
        x: width / 2,
        y: height / 2 - 50,
        text: mainText,
        fontSize: 72,
        fontFamily: 'Inter',
        fontStyle: 'bold',
        fill: background.includes('gradient') || background === '#0a0a0f' ? '#ffffff' : '#333333',
      });
    } else {
      // Complex design with decorations
      
      // Background shape
      addElement({
        type: 'circle',
        x: width * 0.2,
        y: height * 0.3,
        radius: 100,
        fill: '#8b5cf6',
        opacity: 0.3,
      });

      // Main title
      addElement({
        type: 'text',
        x: width / 2,
        y: height / 2 - 80,
        text: mainText,
        fontSize: 64,
        fontFamily: 'Inter',
        fontStyle: 'bold',
        fill: background.includes('gradient') || background === '#0a0a0f' ? '#ffffff' : '#333333',
      });

      // Subtitle
      addElement({
        type: 'text',
        x: width / 2,
        y: height / 2 + 40,
        text: subText,
        fontSize: 32,
        fontFamily: 'Inter',
        fill: background.includes('gradient') || background === '#0a0a0f' ? '#e0e0e0' : '#666666',
      });

      // Accent rectangle
      addElement({
        type: 'rectangle',
        x: width / 2 - 150,
        y: height * 0.75,
        width: 300,
        height: 8,
        fill: '#ec4899',
      });
    }

    setIsGenerating(false);
    setPrompt('');
    onClose();
  };

  const suggestions = [
    'Create an Instagram post about summer sale with beach vibes',
    'Design a YouTube thumbnail for a tech review video',
    'Make a dark themed Instagram story for a music event',
    'Create a professional presentation slide for a business pitch',
    'Design a minimal logo with purple accents',
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}
    onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '700px',
          background: 'var(--bg-elevated)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
        className="animate-fadeIn"
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={20} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}>
                AI Design Generator
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-tertiary)',
              }}>
                Describe your design and let AI create it for you
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-base)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Prompt Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              Describe your design
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Create an Instagram post about summer sale with beach vibes"
              rows={4}
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border-primary)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '15px',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all var(--transition-base)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
              }}
            />
          </div>

          {/* Suggestions */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Try these prompts
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  style={{
                    padding: '12px 16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    transition: 'all var(--transition-base)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateDesignFromPrompt}
            disabled={!prompt.trim() || isGenerating}
            style={{
              width: '100%',
              padding: '16px',
              background: isGenerating ? 'var(--bg-tertiary)' : 'var(--accent-gradient)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all var(--transition-base)',
              boxShadow: 'var(--shadow-md)',
            }}
            className={!isGenerating ? 'hover-lift' : ''}
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating your design...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Design
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
