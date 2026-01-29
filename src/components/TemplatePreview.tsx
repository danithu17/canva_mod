import React from 'react';
import { X, Sparkles, Layout, Smartphone } from 'lucide-react';
import { type Template } from '../store/editorStore';

interface TemplatePreviewProps {
  template: Template | null;
  onClose: () => void;
  onCustomize: (template: Template) => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, onClose, onCustomize }) => {
  if (!template) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div 
        style={{
          width: '90%',
          maxWidth: '900px',
          height: '80vh',
          background: 'white',
          borderRadius: '16px',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>

        {/* Left: Preview Area */}
        <div style={{
          flex: 1,
          background: '#f2f3f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: template.elements.find(el => el.type === 'rectangle' && el.width === template.width)?.fill || 'white',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px',
          }}>
            {/* Simple representation of elements for preview */}
            <div style={{ textAlign: 'center' }}>
               <div style={{ fontWeight: 700, fontSize: '24px', marginBottom: '8px', color: '#000' }}>{template.name}</div>
               <div>{template.width} × {template.height} px</div>
            </div>
          </div>
        </div>

        {/* Right: Info Area */}
        <div style={{
          width: '320px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          borderLeft: '1px solid #e2e8f0',
        }}>
          <div>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 700, 
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {template.category}
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: '#0e0e10' }}>
              {template.name}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666', fontSize: '14px' }}>
              <Layout size={18} />
              Fully customizable
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666', fontSize: '14px' }}>
              <Smartphone size={18} />
              Mobile friendly
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666', fontSize: '14px' }}>
              <Sparkles size={18} />
              High resolution
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button 
              onClick={() => onCustomize(template)}
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--accent-gradient)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              }}
              className="hover-lift"
            >
              Customize this template
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '16px' }}>
              100% editable and ready for use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
