import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { templates, type Template } from '../data/templates';
import { TemplatePreview } from './TemplatePreview';

export const TemplatesPanel: React.FC = () => {
  const { showTemplates, loadTemplate } = useEditorStore();
  const [selectedCategory, setSelectedCategory] = useState<Template['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  if (!showTemplates) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'social', label: 'Social' },
    { id: 'presentation', label: 'Slides' },
    { id: 'logo', label: 'Logos' },
    { id: 'poster', label: 'Posters' },
    { id: 'document', label: 'Docs' },
  ] as const;

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
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
                onClick={() => setPreviewTemplate(template)}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  aspectRatio: template.width / template.height > 1.2 ? '16/9' : (template.width / template.height < 0.8 ? '9/16' : '1/1'),
                  background: '#f2f3f5',
                  transition: 'all 0.2s',
                  border: '1px solid #e2e8f0',
                }}
                className="hover-lift"
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: template.elements.find(el => el.type === 'rectangle')?.fill || '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}>
                  {template.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <TemplatePreview 
        template={previewTemplate} 
        onClose={() => setPreviewTemplate(null)}
        onCustomize={(t) => {
          loadTemplate(t);
          setPreviewTemplate(null);
        }}
      />
    </>
  );
};
