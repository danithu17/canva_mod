import React, { useState } from 'react';
import { 
  Sparkles, Palette, Home, Layout, FolderOpen, Image as ImageIcon, 
  Settings, HelpCircle, Search, Plus, Bell, User 
} from 'lucide-react';
import { TemplatePreview } from './TemplatePreview';
import { templates } from '../data/templates';
import { type Template } from '../store/editorStore';

interface LandingPageProps {
  onStartDesigning: () => void;
  onLoadTemplate: (template: Template) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDesigning, onLoadTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<Template | null>(null);

  const designCategories = [
    { id: 'social', icon: ImageIcon, label: 'Social Media', color: '#667eea' },
    { id: 'presentation', icon: Layout, label: 'Presentation', color: '#4facfe' },
    { id: 'logo', icon: Palette, label: 'Logo', color: '#f5576c' },
    { id: 'poster', icon: ImageIcon, label: 'Poster', color: '#43e97b' },
    { id: 'document', icon: Plus, label: 'Document', color: '#8b5cf6' },
  ];

  const recentTemplates = templates.slice(0, 3);
  const recommendedTemplates = templates.slice(3, 6);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      color: 'var(--text-primary)',
      overflow: 'hidden',
    }}>
      {/* Sidebar Navigation */}
      <aside style={{
        width: '240px',
        borderRight: '1px solid var(--border-primary)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 12px',
        background: 'var(--bg-elevated)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 12px',
          marginBottom: '32px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--accent-gradient)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            <Palette size={20} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800 }} className="gradient-text">DesignStudio</span>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Sparkles, label: 'Magic Studio' },
            { icon: Layout, label: 'Templates' },
            { icon: FolderOpen, label: 'Projects' },
          ].map((item, i) => (
            <button key={i} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              border: 'none',
              background: item.active ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
              color: item.active ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '4px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!item.active) e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              if (!item.active) e.currentTarget.style.background = 'transparent';
            }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}

          <div style={{ height: '32px' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', padding: '0 12px', textTransform: 'uppercase' }}>Magic Tools</span>
          
          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            marginTop: '12px',
            background: 'var(--accent-gradient)',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
          }}>
            <Sparkles size={18} />
            AI Generator
          </button>
        </nav>

        <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '12px' }}>
          {[
            { icon: Settings, label: 'Settings' },
            { icon: HelpCircle, label: 'Help Center' },
          ].map((item, i) => (
            <button key={i} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              background: 'transparent',
              color: 'var(--text-tertiary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Header Bar */}
        <header style={{
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '16px',
        }}>
          <button style={{ padding: '8px', borderRadius: '50%', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Bell size={20}/></button>
          <button style={{ 
            padding: '8px 16px', 
            borderRadius: '20px', 
            background: 'var(--accent-gradient)', 
            color: 'white', 
            border: 'none', 
            fontWeight: 700, 
            cursor: 'pointer' 
          }} onClick={onStartDesigning}>Create a design</button>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20}/></div>
        </header>

        {/* Home Hero Content */}
        <div style={{ padding: '0 32px 40px' }}>
          <div style={{
            background: 'linear-gradient(rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8)), url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1400") center/cover',
            borderRadius: '24px',
            padding: '60px 40px',
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}>
            <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '24px' }}>What will you design today?</h1>
            
            <div style={{
              width: '100%',
              maxWidth: '600px',
              position: 'relative',
            }}>
              <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input 
                type="text" 
                placeholder="Search your content or templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 52px',
                  borderRadius: '30px',
                  border: 'none',
                  fontSize: '16px',
                  outline: 'none',
                  color: '#333',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }} 
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {designCategories.map((cat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)', transition: 'background 0.2s'
                  }} className="hover-lift">
                    <cat.icon size={24} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Designs Section */}
        <div style={{ padding: '0 32px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Recent designs</h2>
            <button style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>See all</button>
          </div>

          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '12px' }}>
            {recentTemplates.map((p, i) => (
              <div key={i} style={{ 
                minWidth: '220px', 
                background: 'var(--bg-elevated)', 
                borderRadius: '12px', 
                border: '1px solid var(--border-primary)',
                cursor: 'pointer',
                overflow: 'hidden',
              }} onClick={() => setSelectedPreview(p)} className="hover-lift">
                <div style={{ 
                  height: '140px', 
                  background: p.elements.find(el => el.type === 'rectangle')?.fill || '#8b5cf6', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontWeight: 700 
                }}>
                  {p.name}
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{p.width}×{p.height}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div style={{ padding: '0 32px 60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Try something new</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
             {recommendedTemplates.map((item, i) => (
               <div key={i} style={{ 
                 display: 'flex', gap: '16px', padding: '20px', background: 'var(--bg-elevated)', 
                 borderRadius: '16px', border: '1px solid var(--border-primary)', cursor: 'pointer' 
               }} className="hover-lift" onClick={() => setSelectedPreview(item)}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                   <Layout size={24} />
                 </div>
                 <div>
                   <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.name}</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{item.category}</div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </main>

      <TemplatePreview 
        template={selectedPreview} 
        onClose={() => setSelectedPreview(null)}
        onCustomize={(t) => {
          onLoadTemplate(t);
          onStartDesigning();
        }}
      />
    </div>
  );
};
