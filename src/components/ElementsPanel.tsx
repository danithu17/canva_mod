import React from 'react';
import { Square, Circle, Minus, Search, Star, Triangle } from 'lucide-react';
import { useEditorStore, type CanvasElement } from '../store/editorStore';

export const ElementsPanel: React.FC = () => {
  const { activePanel, addElement } = useEditorStore();

  if (activePanel !== 'elements' && activePanel !== 'text') return null;

  const shapes = [
    { type: 'rectangle' as const, icon: Square, label: 'Square', fill: '#8b5cf6' },
    { type: 'circle' as const, icon: Circle, label: 'Circle', fill: '#ec4899' },
    { type: 'star' as const, icon: Star, label: 'Star', fill: '#f59e0b' },
    { type: 'triangle' as const, icon: Triangle, label: 'Triangle', fill: '#10b981' },
    { type: 'line' as const, icon: Minus, label: 'Line', stroke: '#ffffff' },
  ];

  const textStyles = [
    { label: 'Add a heading', fontSize: 48, fontWeight: 'bold' as const },
    { label: 'Add a subheading', fontSize: 24, fontWeight: '600' as const },
    { label: 'Add a little bit of body text', fontSize: 16, fontWeight: 'normal' as const },
  ];

  return (
    <div style={{
      width: '320px',
      background: 'white',
      borderRight: '1px solid var(--border-primary)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      zIndex: 5,
    }}>
      <div style={{ padding: '24px 16px 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0e0e10', marginBottom: '16px' }}>
          {activePanel === 'text' ? 'Text' : 'Elements'}
        </h2>
        
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input
            type="text"
            placeholder={`Search ${activePanel === 'text' ? 'text' : 'elements'}...`}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              background: '#f2f3f5',
              border: '1px solid transparent',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {activePanel === 'elements' && (
          <>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0e0e10', marginBottom: '12px' }}>Shapes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {shapes.map((shape) => (
                <button
                  key={shape.type}
                  onClick={() => addElement({
                    type: shape.type,
                    x: 100,
                    y: 100,
                    width: 100,
                    height: 100,
                    radius: 50,
                    fill: 'fill' in shape ? shape.fill : undefined,
                    stroke: 'stroke' in shape ? shape.stroke : undefined,
                    strokeWidth: 2,
                    rotation: 0,
                  } as Omit<CanvasElement, 'id'>)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: '#f2f3f5',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f2f3f5'}
                >
                  <shape.icon size={24} color="#0e0e10" />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#0e0e10' }}>{shape.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activePanel === 'text' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {textStyles.map((style, i) => (
              <button
                key={i}
                onClick={() => addElement({
                  type: 'text',
                  x: 100,
                  y: 100 + i * 100,
                  text: style.label,
                  fontSize: style.fontSize,
                  fontFamily: 'Inter',
                  fontStyle: style.fontWeight === 'bold' ? 'bold' : 'normal',
                  fill: '#000000',
                  rotation: 0,
                })}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#f2f3f5',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f2f3f5'}
              >
                <div style={{ 
                  fontSize: `${Math.min(style.fontSize, 24)}px`, 
                  fontWeight: style.fontWeight as CanvasElement['fontStyle'],
                  color: '#0e0e10' 
                }}>
                  {style.label}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
