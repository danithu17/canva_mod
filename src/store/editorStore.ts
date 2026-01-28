import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface CanvasElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'image' | 'line';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  src?: string;
  points?: number[];
  draggable?: boolean;
  opacity?: number;
}

export interface Template {
  id: string;
  name: string;
  category: 'social' | 'presentation' | 'logo' | 'poster' | 'document';
  thumbnail: string;
  width: number;
  height: number;
  elements: CanvasElement[];
}

interface EditorState {
  // Canvas
  canvasWidth: number;
  canvasHeight: number;
  canvasScale: number;
  canvasBackground: string;
  
  // Elements
  elements: CanvasElement[];
  selectedElementId: string | null;
  
  // History
  history: CanvasElement[][];
  historyStep: number;
  
  // UI State
  activeTool: 'select' | 'text' | 'rectangle' | 'circle' | 'image' | 'line';
  showTemplates: boolean;
  showLayers: boolean;
  activePanel: 'templates' | 'elements' | 'layers' | 'text' | 'uploads' | 'apps' | null;
  currentView: 'landing' | 'editor';
  
  // Actions
  setCanvasSize: (width: number, height: number) => void;
  setCanvasScale: (scale: number) => void;
  setCanvasBackground: (color: string) => void;
  
  addElement: (element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  
  duplicateElement: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  
  undo: () => void;
  redo: () => void;
  
  setActiveTool: (tool: EditorState['activeTool']) => void;
  setActivePanel: (panel: EditorState['activePanel']) => void;
  toggleTemplates: () => void;
  toggleLayers: () => void;
  setView: (view: 'landing' | 'editor') => void;
  
  loadTemplate: (template: Template) => void;
  clearCanvas: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Initial state
  canvasWidth: 1920,
  canvasHeight: 1080,
  canvasScale: 1,
  canvasBackground: '#ffffff',
  
  elements: [],
  selectedElementId: null,
  
  history: [[]],
  historyStep: 0,
  
  activeTool: 'select',
  showTemplates: true,
  showLayers: false,
  activePanel: 'templates',
  currentView: 'landing',
  
  // Canvas actions
  setCanvasSize: (width, height) => set({ canvasWidth: width, canvasHeight: height }),
  setCanvasScale: (scale) => set({ canvasScale: scale }),
  setCanvasBackground: (color) => set({ canvasBackground: color }),
  
  // Element actions
  addElement: (element) => {
    const newElement: CanvasElement = {
      ...element,
      id: uuidv4(),
      draggable: true,
      opacity: 1,
    };
    
    set((state) => {
      const newElements = [...state.elements, newElement];
      const newHistory = state.history.slice(0, state.historyStep + 1);
      newHistory.push(newElements);
      
      return {
        elements: newElements,
        selectedElementId: newElement.id,
        history: newHistory,
        historyStep: newHistory.length - 1,
      };
    });
  },
  
  updateElement: (id, updates) => {
    set((state) => {
      const newElements = state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      );
      
      const newHistory = state.history.slice(0, state.historyStep + 1);
      newHistory.push(newElements);
      
      return {
        elements: newElements,
        history: newHistory,
        historyStep: newHistory.length - 1,
      };
    });
  },
  
  deleteElement: (id) => {
    set((state) => {
      const newElements = state.elements.filter((el) => el.id !== id);
      const newHistory = state.history.slice(0, state.historyStep + 1);
      newHistory.push(newElements);
      
      return {
        elements: newElements,
        selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
        history: newHistory,
        historyStep: newHistory.length - 1,
      };
    });
  },
  
  selectElement: (id) => set({ selectedElementId: id }),
  
  duplicateElement: (id) => {
    const element = get().elements.find((el) => el.id === id);
    if (element) {
      const duplicate = { ...element };
      // @ts-expect-error - removing id for addElement
      delete duplicate.id;
      duplicate.x = element.x + 20;
      duplicate.y = element.y + 20;
      get().addElement(duplicate);
    }
  },
  
  bringToFront: (id) => {
    set((state) => {
      const element = state.elements.find((el) => el.id === id);
      if (!element) return state;
      
      const newElements = [
        ...state.elements.filter((el) => el.id !== id),
        element,
      ];
      
      return { elements: newElements };
    });
  },
  
  sendToBack: (id) => {
    set((state) => {
      const element = state.elements.find((el) => el.id === id);
      if (!element) return state;
      
      const newElements = [
        element,
        ...state.elements.filter((el) => el.id !== id),
      ];
      
      return { elements: newElements };
    });
  },
  
  // History actions
  undo: () => {
    set((state) => {
      if (state.historyStep > 0) {
        const newStep = state.historyStep - 1;
        return {
          elements: state.history[newStep],
          historyStep: newStep,
        };
      }
      return state;
    });
  },
  
  redo: () => {
    set((state) => {
      if (state.historyStep < state.history.length - 1) {
        const newStep = state.historyStep + 1;
        return {
          elements: state.history[newStep],
          historyStep: newStep,
        };
      }
      return state;
    });
  },
  
  // UI actions
  setActiveTool: (tool) => set({ activeTool: tool }),
  setActivePanel: (panel) => set({ 
    activePanel: panel, 
    showTemplates: panel === 'templates', 
    showLayers: panel === 'layers' 
  }),
  toggleTemplates: () => set((state) => ({ 
    showTemplates: !state.showTemplates,
    activePanel: !state.showTemplates ? 'templates' : (state.activePanel === 'templates' ? null : state.activePanel)
  })),
  toggleLayers: () => set((state) => ({ 
    showLayers: !state.showLayers,
    activePanel: !state.showLayers ? 'layers' : (state.activePanel === 'layers' ? null : state.activePanel)
  })),
  setView: (view) => set({ currentView: view }),
  
  // Template actions
  loadTemplate: (template) => {
    set({
      canvasWidth: template.width,
      canvasHeight: template.height,
      elements: template.elements.map((el) => ({ ...el, id: uuidv4() })),
      selectedElementId: null,
      showTemplates: false,
    });
  },
  
  clearCanvas: () => {
    set({
      elements: [],
      selectedElementId: null,
      history: [[]],
      historyStep: 0,
    });
  },
}));
