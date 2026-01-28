import React from 'react';
import { 
  Layout, Sparkles, Shapes, Type, Upload, Layers, 
  Smartphone, Info 
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export const LeftSidebar: React.FC = () => {
  const { activePanel, setActivePanel } = useEditorStore();

  const menuItems = [
    { id: 'templates' as const, icon: Layout, label: 'Design' },
    { id: 'elements' as const, icon: Shapes, label: 'Elements' },
    { id: 'text' as const, icon: Type, label: 'Text' },
    { id: 'magic' as const, icon: Sparkles, label: 'Magic Media', iconColor: 'var(--accent-primary)' },
    { id: 'uploads' as const, icon: Upload, label: 'Uploads' },
    { id: 'layers' as const, icon: Layers, label: 'Layers' },
    { id: 'apps' as const, icon: Smartphone, label: 'Apps' },
  ];

  return (
    <div style={{
      width: '72px',
      height: '100%',
      background: '#18191b', // Dark side color like Canva
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 0',
      zIndex: 100,
    }}>
      {menuItems.map((item) => {
        const isActive = activePanel === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActivePanel(item.id as typeof activePanel)}
            style={{
              width: '100%',
              padding: '12px 0',
              background: isActive ? '#252627' : 'transparent',
              border: 'none',
              color: isActive ? 'white' : '#a0a0a2',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = '#a0a0a2';
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'var(--accent-primary)',
              }} />
            )}
            <item.icon size={24} color={item.iconColor || 'currentColor'} />
            <span style={{ fontSize: '10px', fontWeight: 500 }}>{item.label}</span>
          </button>
        );
      })}

      <div style={{ marginTop: 'auto' }}>
        <button style={{
          width: '100%',
          padding: '12px 0',
          background: 'transparent',
          border: 'none',
          color: '#a0a0a2',
          cursor: 'pointer',
        }}>
          <Info size={20} />
        </button>
      </div>
    </div>
  );
};
