import React, { useState } from 'react';
import {
  Undo2, Redo2, ChevronDown, Share2, Home, Cloud, Sparkles, Copy, Trash2, User
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { AIPromptPanel } from './AIPromptPanel';

export const Toolbar: React.FC = () => {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [docTitle, setDocTitle] = useState('Untitled Design');
  
  const {
    selectedElementId, deleteElement, duplicateElement, 
    undo, redo, setView, canvasWidth, canvasHeight,
  } = useEditorStore();

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${docTitle}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <>
      <div style={{
        height: '56px',
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border-primary)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        position: 'relative',
      }}>
        {/* Left: Home, File, Magic switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={() => setView('landing')}
            style={{ 
              padding: '8px', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
            className="hover-bg-secondary"
          >
            <Home size={20} />
          </button>
          
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '4px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }} className="hover-bg-secondary">
            File <ChevronDown size={14} />
          </button>

          <button style={{
             padding: '6px 14px',
             background: 'rgba(139, 92, 246, 0.1)',
             color: 'var(--accent-primary)',
             borderRadius: '20px',
             fontSize: '13px',
             fontWeight: 700,
             display: 'flex',
             alignItems: 'center',
             gap: '6px',
             border: 'none',
             cursor: 'pointer',
             marginLeft: '8px',
          }} className="hover-lift">
            <Sparkles size={14} /> Magic Switch
          </button>

          <div style={{ display: 'flex', gap: '2px', marginLeft: '12px' }}>
            <button onClick={undo} style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-secondary"><Undo2 size={18} /></button>
            <button onClick={redo} style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-secondary"><Redo2 size={18} /></button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px', color: 'var(--text-tertiary)', fontSize: '13px' }}>
            <Cloud size={14} /> <span>Saved</span>
          </div>
        </div>

        {/* Center: Title */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            style={{
              background: 'transparent',
              border: '1px solid transparent',
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontWeight: 700,
              padding: '4px 12px',
              textAlign: 'center',
              borderRadius: '4px',
              outline: 'none',
              width: '180px',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.background = 'var(--bg-secondary)';
              e.target.style.border = '1px solid var(--accent-primary)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.border = '1px solid transparent';
            }}
          />
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px' }}>
            {canvasWidth} × {canvasHeight}
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedElementId && (
            <div style={{ display: 'flex', gap: '4px', marginRight: '16px' }}>
              <button 
                onClick={() => duplicateElement(selectedElementId)} 
                title="Duplicate"
                style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }} 
                className="hover-bg-secondary"
              ><Copy size={18} /></button>
              <button 
                onClick={() => deleteElement(selectedElementId)} 
                title="Delete"
                style={{ padding: '8px', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', borderRadius: '4px' }} 
                className="hover-bg-secondary"
              ><Trash2 size={18} /></button>
            </div>
          )}

          <button
            onClick={() => setShowAIPanel(true)}
            style={{
              padding: '8px 16px',
              background: 'var(--accent-gradient)',
              color: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            className="hover-lift hover-glow"
          >
            <Sparkles size={16} /> Magic AI
          </button>

          <button
            onClick={handleExport}
            style={{
              padding: '8px 20px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 600,
              border: '1px solid var(--border-primary)',
              cursor: 'pointer',
            }}
            className="hover-lift"
          >
            <Share2 size={16} /> Share
          </button>

          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'var(--bg-tertiary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer',
            marginLeft: '8px'
          }}><User size={18} /></div>
        </div>
      </div>
      <AIPromptPanel show={showAIPanel} onClose={() => setShowAIPanel(false)} />
    </>
  );
};
