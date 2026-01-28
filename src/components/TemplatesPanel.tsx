import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { templates, type Template } from '../data/templates';

export const TemplatesPanel: React.FC = () => {
  const { showTemplates, loadTemplate } = useEditorStore();
  const [selectedCategory, setSelectedCategory] = useState<Template['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!showTemplates) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'social', label: 'Social' },
    { id: 'presentation', label: 'Slides' },
    { id: 'logo', label: 'Logos' },
  ] as const;

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      {/* Header */}
      <div style={{ padding: '24px 16px 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0e0e10', marginBottom: '16px' }}>Templates</h2>
        
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              background: '#f2f3f5',
              border: '1px solid transparent',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => e.target.style.background = 'white'}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Template['category'] | 'all')}
              style={{
                padding: '6px 14px',
                background: selectedCategory === category.id ? '#0e0e10' : '#f2f3f5',
                color: selectedCategory === category.id ? 'white' : '#0e0e10',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => loadTemplate(template)}
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                border: '1px solid #e2e8f0',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                aspectRatio: `${template.width}/${template.height}`,
                background: 'linear-gradient(135deg, #f6f8fb, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Info size={16} color="#a0aec0" />
              </div>
              <div style={{ padding: '8px', fontSize: '11px', fontWeight: 600, color: '#4a5568' }}>
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
