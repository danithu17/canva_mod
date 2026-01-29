import { useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { LayersPanel } from './components/LayersPanel';
import { TemplatesPanel } from './components/TemplatesPanel';
import { LeftSidebar } from './components/LeftSidebar';
import { ElementsPanel } from './components/ElementsPanel';
import { LandingPage } from './components/LandingPage';
import { useEditorStore } from './store/editorStore';

function App() {
  const { selectElement, deleteElement, currentView, setView, loadTemplate } = useEditorStore();

  // Keyboard shortcuts
  useEffect(() => {
    if (currentView !== 'editor') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete selected element
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selectedId = useEditorStore.getState().selectedElementId;
        if (selectedId) {
          e.preventDefault();
          deleteElement(selectedId);
        }
      }

      // Deselect on Escape
      if (e.key === 'Escape') {
        selectElement(null);
      }

      // Undo/Redo
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          useEditorStore.getState().undo();
        } else if (e.key === 'z' && e.shiftKey) {
          e.preventDefault();
          useEditorStore.getState().redo();
        } else if (e.key === 'y') {
          e.preventDefault();
          useEditorStore.getState().redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectElement, deleteElement, currentView]);

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onStartDesigning={() => setView('editor')} 
        onLoadTemplate={loadTemplate}
      />
    );
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
    }}>
      {/* Top Navigation Bar */}
      <Toolbar />

      {/* Main Studio Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Left Sidebar and Panels Area */}
        <div style={{ 
          display: 'flex', 
          height: '100%',
          zIndex: 10,
          background: 'var(--bg-elevated)',
          borderRight: '1px solid var(--border-primary)',
        }}>
          <LeftSidebar />
          
          {/* Secondary Sidebar Panels */}
          <TemplatesPanel />
          <ElementsPanel />
          <LayersPanel />
        </div>

        {/* Canvas Area (Central) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          position: 'relative',
        }}>
          {/* Mini Contextual Toolbar could go here */}
          <Canvas />
        </div>

        {/* Right Sidebar (Properties - only when selected) */}
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
