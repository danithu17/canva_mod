import React from 'react';
import { Eye, EyeOff, Lock, Unlock, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export const LayersPanel: React.FC = () => {
  const {
    elements,
    selectedElementId,
    selectElement,
    deleteElement,
    updateElement,
    bringToFront,
    sendToBack,
    showLayers,
  } = useEditorStore();

  if (!showLayers) return null;

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text':
        return '📝';
      case 'rectangle':
        return '▭';
      case 'circle':
        return '⭕';
      case 'image':
        return '🖼️';
      case 'line':
        return '─';
      default:
        return '📦';
    }
  };

  const getElementName = (element: typeof elements[0]) => {
    if (element.type === 'text') {
      return element.text?.substring(0, 20) || 'Text';
    }
    return `${element.type.charAt(0).toUpperCase()}${element.type.slice(1)}`;
  };

  return (
    <div style={{
      width: '280px',
      background: 'var(--bg-elevated)',
      borderLeft: '1px solid var(--border-primary)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--border-primary)',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Layers
        </h3>
        <p style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          marginTop: '4px',
        }}>
          {elements.length} element{elements.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Layers List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
      }}>
        {elements.length === 0 ? (
          <div style={{
            padding: '32px 16px',
            textAlign: 'center',
            color: 'var(--text-tertiary)',
            fontSize: '14px',
          }}>
            No layers yet. Add elements to get started!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[...elements].reverse().map((element, index) => {
              const isSelected = element.id === selectedElementId;
              const isVisible = element.opacity !== 0;
              const isLocked = element.draggable === false;
              
              return (
                <div
                  key={element.id}
                  onClick={() => selectElement(element.id)}
                  style={{
                    padding: '12px',
                    background: isSelected ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    border: isSelected ? '1px solid var(--accent-secondary)' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'var(--bg-secondary)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '16px' }}>
                      {getElementIcon(element.type)}
                    </span>
                    
                    <span style={{
                      flex: 1,
                      fontSize: '13px',
                      fontWeight: 500,
                      color: isSelected ? 'white' : 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {getElementName(element)}
                    </span>

                    {/* Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      opacity: 0.7,
                    }}
                    onClick={(e) => e.stopPropagation()}>
                      {/* Visibility Toggle */}
                      <button
                        onClick={() => updateElement(element.id, { opacity: isVisible ? 0 : 1 })}
                        title={isVisible ? 'Hide' : 'Show'}
                        style={{
                          padding: '4px',
                          background: 'transparent',
                          color: isSelected ? 'white' : 'var(--text-secondary)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>

                      {/* Lock Toggle */}
                      <button
                        onClick={() => updateElement(element.id, { draggable: isLocked ? true : false })}
                        title={isLocked ? 'Unlock' : 'Lock'}
                        style={{
                          padding: '4px',
                          background: 'transparent',
                          color: isSelected ? 'white' : 'var(--text-secondary)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                      </button>

                      {/* Move Up */}
                      {index < elements.length - 1 && (
                        <button
                          onClick={() => bringToFront(element.id)}
                          title="Bring to front"
                          style={{
                            padding: '4px',
                            background: 'transparent',
                            color: isSelected ? 'white' : 'var(--text-secondary)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ChevronUp size={14} />
                        </button>
                      )}

                      {/* Move Down */}
                      {index > 0 && (
                        <button
                          onClick={() => sendToBack(element.id)}
                          title="Send to back"
                          style={{
                            padding: '4px',
                            background: 'transparent',
                            color: isSelected ? 'white' : 'var(--text-secondary)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ChevronDown size={14} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => deleteElement(element.id)}
                        title="Delete"
                        style={{
                          padding: '4px',
                          background: 'transparent',
                          color: 'var(--error)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
