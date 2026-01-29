import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { 
  Move, Palette, Type, MousePointer2, type LucideIcon
} from 'lucide-react';

const SectionTitle: React.FC<{ icon: LucideIcon; title: string }> = ({ icon: Icon, title }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    marginBottom: '12px', 
    color: 'var(--text-primary)',
    marginTop: '8px'
  }}>
    <Icon size={16} />
    <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
  </div>
);

import { 
  AlignLeft, AlignCenter, AlignRight, AlignStartVertical as AlignTop, 
  AlignCenterVertical as AlignMiddle, AlignEndVertical as AlignBottom,
  ChevronUp, ChevronDown, Layers
} from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { elements, selectedElementId, updateElement, alignElement, bringToFront, sendToBack } = useEditorStore();

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div style={{
        width: '280px',
        background: 'var(--bg-elevated)',
        borderLeft: '1px solid var(--border-primary)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <MousePointer2 size={32} opacity={0.3} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>No selection</h3>
        <p style={{ fontSize: '13px', opacity: 0.7 }}>Select an element on the canvas to see its properties.</p>
      </div>
    );
  }

  const handleChange = (property: string, value: string | number) => {
    updateElement(selectedElementId!, { [property]: value });
  };

  return (
    <div style={{
      width: '280px',
      background: 'var(--bg-elevated)',
      borderLeft: '1px solid var(--border-primary)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 16px',
        borderBottom: '1px solid var(--border-primary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
           <div style={{ 
             width: '8px', 
             height: '8px', 
             borderRadius: '50%', 
             background: 'var(--accent-primary)' 
           }} />
           <h2 style={{ fontSize: '15px', fontWeight: 700 }}>{selectedElement.type.toUpperCase()}</h2>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Transform Section */}
        <section>
          <SectionTitle icon={Move} title="Transform" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="prop-group">
              <label className="prop-label">X</label>
              <input type="number" 
                value={Math.round(selectedElement.x)} 
                onChange={(e) => handleChange('x', parseInt(e.target.value))}
                className="prop-input"
              />
            </div>
            <div className="prop-group">
              <label className="prop-label">Y</label>
              <input type="number" 
                value={Math.round(selectedElement.y)} 
                onChange={(e) => handleChange('y', parseInt(e.target.value))}
                className="prop-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            {(selectedElement.width !== undefined) && (
              <div className="prop-group">
                <label className="prop-label">Width</label>
                <input type="number" 
                  value={Math.round(selectedElement.width)} 
                  onChange={(e) => handleChange('width', parseInt(e.target.value))}
                  className="prop-input"
                />
              </div>
            )}
            {(selectedElement.height !== undefined) && (
              <div className="prop-group">
                <label className="prop-label">Height</label>
                <input type="number" 
                  value={Math.round(selectedElement.height)} 
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                  className="prop-input"
                />
              </div>
            )}
            {(selectedElement.radius !== undefined) && (
               <div className="prop-group" style={{ gridColumn: 'span 2' }}>
                <label className="prop-label">Radius</label>
                <input type="number" 
                  value={Math.round(selectedElement.radius)} 
                  onChange={(e) => handleChange('radius', parseInt(e.target.value))}
                  className="prop-input"
                />
              </div>
            )}
          </div>
          
          <div className="prop-group" style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="prop-label">Rotation</label>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{Math.round(selectedElement.rotation || 0)}°</span>
            </div>
            <input type="range" min="0" max="360" 
              value={selectedElement.rotation || 0} 
              onChange={(e) => handleChange('rotation', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>
        </section>

        {/* Arrangement Section */}
        <section>
          <SectionTitle icon={Layers} title="Arrangement" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button onClick={() => alignElement(selectedElement.id, 'left')} className="align-btn" title="Align Left"><AlignLeft size={16} /></button>
            <button onClick={() => alignElement(selectedElement.id, 'center')} className="align-btn" title="Align Center"><AlignCenter size={16} /></button>
            <button onClick={() => alignElement(selectedElement.id, 'right')} className="align-btn" title="Align Right"><AlignRight size={16} /></button>
            <button onClick={() => alignElement(selectedElement.id, 'top')} className="align-btn" title="Align Top"><AlignTop size={16} /></button>
            <button onClick={() => alignElement(selectedElement.id, 'middle')} className="align-btn" title="Align Middle"><AlignMiddle size={16} /></button>
            <button onClick={() => alignElement(selectedElement.id, 'bottom')} className="align-btn" title="Align Bottom"><AlignBottom size={16} /></button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={() => bringToFront(selectedElement.id)} className="align-btn" style={{ flex: 1, gap: '4px' }}>
              <ChevronUp size={16} /> Bring to Front
            </button>
            <button onClick={() => sendToBack(selectedElement.id)} className="align-btn" style={{ flex: 1, gap: '4px' }}>
              <ChevronDown size={16} /> Send to Back
            </button>
          </div>
        </section>

        {/* Appearance Section */}
        <section>
          <SectionTitle icon={Palette} title="Appearance" />
          
          {selectedElement.fill && (
            <div className="prop-group">
              <label className="prop-label">Fill</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="color" 
                  value={selectedElement.fill} 
                  onChange={(e) => handleChange('fill', e.target.value)}
                  style={{ width: '40px', height: '40px', borderRadius: '4px', border: '1px solid var(--border-primary)', cursor: 'pointer', background: 'none' }}
                />
                <input type="text" 
                  value={selectedElement.fill} 
                  onChange={(e) => handleChange('fill', e.target.value)}
                  className="prop-input"
                  style={{ flex: 1, fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
            </div>
          )}

          <div className="prop-group" style={{ marginTop: '12px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="prop-label">Opacity</label>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{Math.round((selectedElement.opacity || 1) * 100)}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.01"
              value={selectedElement.opacity || 1} 
              onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>
        </section>

        {/* Text Section */}
        {selectedElement.type === 'text' && (
          <section>
            <SectionTitle icon={Type} title="Typography" />
            <div className="prop-group">
              <label className="prop-label">Content</label>
              <textarea 
                value={selectedElement.text} 
                onChange={(e) => handleChange('text', e.target.value)}
                className="prop-input"
                rows={3}
                style={{ resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div className="prop-group">
                <label className="prop-label">Size</label>
                <input type="number" 
                  value={selectedElement.fontSize} 
                  onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                  className="prop-input"
                />
              </div>
              <div className="prop-group">
                <label className="prop-label">Style</label>
                <select 
                  value={selectedElement.fontStyle} 
                  onChange={(e) => handleChange('fontStyle', e.target.value)}
                  className="prop-input"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="italic">Italic</option>
                  <option value="bold italic">Bold Italic</option>
                </select>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
