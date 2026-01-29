export type { Template } from '../store/editorStore';
import type { Template } from '../store/editorStore';

export const templates: Template[] = [
  {
    id: 'instagram-post-1',
    name: 'Instagram Post - Gradient',
    category: 'social',
    thumbnail: '',
    width: 1080,
    height: 1080,
    elements: [
      { id: 'bg-1', type: 'rectangle', x: 0, y: 0, width: 1080, height: 1080, fill: '#8b5cf6', draggable: false },
      { id: 'text-1', type: 'text', x: 540, y: 400, text: 'Your Title Here', fontSize: 72, fontFamily: 'Inter', fontStyle: 'bold', fill: '#ffffff' },
      { id: 'text-2', type: 'text', x: 540, y: 600, text: 'Subtitle goes here', fontSize: 32, fontFamily: 'Inter', fill: '#e0e0e0' },
    ],
  },
  {
    id: 'food-post-1',
    name: 'Delicious Burger - Food Post',
    category: 'social',
    thumbnail: '',
    width: 1080,
    height: 1080,
    elements: [
      { id: 'bg', type: 'rectangle', x: 0, y: 0, width: 1080, height: 1080, fill: '#ffce44', draggable: false },
      { id: 'circle-bg', type: 'circle', x: 540, y: 540, radius: 450, fill: '#ffffff', opacity: 0.2 },
      { id: 'title', type: 'text', x: 540, y: 150, text: 'BIG BURGER', fontSize: 120, fontFamily: 'Inter', fontStyle: 'bold', fill: '#d62300' },
      { id: 'subtitle', type: 'text', x: 540, y: 280, text: 'LIMITED TIME OFFER', fontSize: 40, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1a1a1a' },
      { id: 'price', type: 'circle', x: 800, y: 800, radius: 80, fill: '#d62300' },
      { id: 'price-text', type: 'text', x: 800, y: 800, text: '$9.99', fontSize: 32, fontFamily: 'Inter', fontStyle: 'bold', fill: '#ffffff' },
    ],
  },
  {
    id: 'business-card-1',
    name: 'Business Card - Minimal',
    category: 'document',
    thumbnail: '',
    width: 1050,
    height: 600,
    elements: [
      { id: 'bg', type: 'rectangle', x: 0, y: 0, width: 1050, height: 600, fill: '#ffffff', draggable: false },
      { id: 'accent', type: 'rectangle', x: 0, y: 0, width: 30, height: 600, fill: '#8b5cf6', draggable: false },
      { id: 'name', type: 'text', x: 100, y: 200, text: 'ALEX RIVIERE', fontSize: 40, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1a1a1a' },
      { id: 'title', type: 'text', x: 100, y: 260, text: 'Creative Director', fontSize: 18, fontFamily: 'Inter', fill: '#666666' },
      { id: 'contact', type: 'text', x: 100, y: 450, text: 'www.reallygreatsite.com | +123-456-7890', fontSize: 14, fontFamily: 'Inter', fill: '#999999' },
    ],
  },
  {
    id: 'resume-1',
    name: 'Modern Resume',
    category: 'document',
    thumbnail: '',
    width: 2480,
    height: 3508,
    elements: [
      { id: 'bg', type: 'rectangle', x: 0, y: 0, width: 2480, height: 3508, fill: '#ffffff', draggable: false },
      { id: 'sidebar', type: 'rectangle', x: 0, y: 0, width: 800, height: 3508, fill: '#f4f4f4', draggable: false },
      { id: 'name', type: 'text', x: 900, y: 300, text: 'FULL NAME', fontSize: 120, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1a1a1a' },
      { id: 'job', type: 'text', x: 900, y: 450, text: 'SOFTWARE ENGINEER', fontSize: 48, fontFamily: 'Inter', fill: '#8b5cf6' },
      { id: 'section-1', type: 'text', x: 900, y: 700, text: 'EXPERIENCE', fontSize: 60, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1a1a1a' },
      { id: 'line-1', type: 'line', x: 900, y: 780, points: [0, 0, 1400, 0], stroke: '#8b5cf6', strokeWidth: 5 },
    ],
  },
  {
    id: 'presentation-1',
    name: 'Presentation Slide',
    category: 'presentation',
    thumbnail: '',
    width: 1920,
    height: 1080,
    elements: [
      { id: 'bg-1', type: 'rectangle', x: 0, y: 0, width: 1920, height: 1080, fill: '#ffffff', draggable: false },
      { id: 'header-bg', type: 'rectangle', x: 0, y: 0, width: 1920, height: 200, fill: '#8b5cf6', draggable: false },
      { id: 'title', type: 'text', x: 100, y: 100, text: 'Presentation Title', fontSize: 64, fontFamily: 'Inter', fontStyle: 'bold', fill: '#ffffff' },
      { id: 'content', type: 'text', x: 100, y: 400, text: 'Your content here...', fontSize: 36, fontFamily: 'Inter', fill: '#333333' },
    ],
  },
  {
    id: 'logo-1',
    name: 'Logo Template',
    category: 'logo',
    thumbnail: '',
    width: 800,
    height: 800,
    elements: [
      { id: 'bg-1', type: 'rectangle', x: 0, y: 0, width: 800, height: 800, fill: '#ffffff', draggable: false },
      { id: 'circle-1', type: 'circle', x: 400, y: 400, radius: 150, fill: '#8b5cf6' },
      { id: 'text-1', type: 'text', x: 400, y: 600, text: 'BRAND', fontSize: 48, fontFamily: 'Inter', fontStyle: 'bold', fill: '#333333' },
    ],
  },
  {
    id: 'poster-modern-1',
    name: 'Abstract Art Expo',
    category: 'poster',
    thumbnail: '',
    width: 1080,
    height: 1920,
    elements: [
      { id: 'bg', type: 'rectangle', x: 0, y: 0, width: 1080, height: 1920, fill: '#ffffff', draggable: false },
      { id: 'rect-1', type: 'rectangle', x: 100, y: 200, width: 400, height: 600, fill: '#ff6b6b' },
      { id: 'rect-2', type: 'rectangle', x: 500, y: 400, width: 480, height: 700, fill: '#4834d4' },
      { id: 'circle-1', type: 'circle', x: 300, y: 1200, radius: 250, fill: '#f9ca24' },
      { id: 'title', type: 'text', x: 540, y: 1600, text: 'ART EXPO 2026', fontSize: 80, fontFamily: 'Inter', fontStyle: 'bold', fill: '#1a1a1a' },
    ],
  },
];

export const getTemplatesByCategory = (category: Template['category']) => {
  return templates.filter((t) => t.category === category);
};

export const getTemplateById = (id: string) => {
  return templates.find((t) => t.id === id);
};
