import React, { useRef, useEffect } from 'react';
import { 
  Stage, Layer, Rect, Circle, Text as KonvaText, 
  Transformer, Line, Image as KonvaImage 
} from 'react-konva';
import { useEditorStore, type CanvasElement } from '../store/editorStore';
import Konva from 'konva';
import useImage from 'use-image';

interface CanvasImageProps {
  element: CanvasElement;
  onClick: () => void;
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onTransformEnd: (node: Konva.Node) => void;
}

const CanvasImage: React.FC<CanvasImageProps> = ({ element, onClick, onDragEnd, onTransformEnd }) => {
  const [image] = useImage(element.src || '');
  return (
    <KonvaImage
      id={element.id}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width || 100}
      height={element.height || 100}
      rotation={element.rotation || 0}
      opacity={element.opacity || 1}
      draggable={element.draggable !== false}
      onClick={onClick}
      onTap={onClick}
      onDragEnd={onDragEnd}
      onTransformEnd={(e: Konva.KonvaEventObject<Event>) => onTransformEnd(e.target as Konva.Node)}
    />
  );
};

export const Canvas: React.FC = () => {
  const {
    canvasWidth,
    canvasHeight,
    canvasScale,
    canvasBackground,
    elements,
    selectedElementId,
    selectElement,
    updateElement,
  } = useEditorStore();

  const transformerRef = useRef<Konva.Transformer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (transformerRef.current && selectedElementId) {
      const stage = transformerRef.current.getStage();
      const selectedNode = stage?.findOne(`#${selectedElementId}`);
      
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedElementId]);

  const handleElementClick = (id: string) => {
    selectElement(id);
  };

  const handleTransformEnd = (id: string, node: Konva.Node) => {
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    updateElement(id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, (node.width() || 0) * scaleX),
      height: Math.max(5, (node.height() || 0) * scaleY),
      rotation: node.rotation(),
    });
  };

  const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    updateElement(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  const renderElement = (element: CanvasElement) => {
    const commonProps = {
      id: element.id,
      key: element.id,
      x: element.x,
      y: element.y,
      rotation: element.rotation || 0,
      draggable: element.draggable !== false,
      onClick: () => handleElementClick(element.id),
      onTap: () => handleElementClick(element.id),
      onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(element.id, e),
      onTransformEnd: (e: Konva.KonvaEventObject<Event>) => handleTransformEnd(element.id, e.target),
      opacity: element.opacity || 1,
    };

    switch (element.type) {
      case 'rectangle':
        return (
          <Rect
            {...commonProps}
            width={element.width || 100}
            height={element.height || 100}
            fill={element.fill || '#8b5cf6'}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth || 0}
          />
        );

      case 'circle':
        return (
          <Circle
            {...commonProps}
            radius={element.radius || 50}
            fill={element.fill || '#8b5cf6'}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth || 0}
          />
        );

      case 'text':
        return (
          <KonvaText
            {...commonProps}
            text={element.text || 'Text'}
            fontSize={element.fontSize || 24}
            fontFamily={element.fontFamily || 'Inter'}
            fontStyle={element.fontStyle || 'normal'}
            fill={element.fill || '#ffffff'}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth || 0}
            align="center"
            verticalAlign="middle"
          />
        );

      case 'line':
        return (
          <Line
            {...commonProps}
            points={element.points || [0, 0, 100, 100]}
            stroke={element.stroke || '#8b5cf6'}
            strokeWidth={element.strokeWidth || 2}
            lineCap="round"
            lineJoin="round"
          />
        );
      
      case 'image':
        return (
          <CanvasImage 
            key={element.id}
            element={element}
            onClick={() => handleElementClick(element.id)}
            onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(element.id, e)}
            onTransformEnd={(node: Konva.Node) => handleTransformEnd(element.id, node)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="canvas-container" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ebecf0', /* Neutral Canva-like workspace background */
      overflow: 'auto',
      padding: '50px',
    }}>
      <div style={{
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        background: canvasBackground,
        lineHeight: 0,
      }}>
        <Stage
          ref={stageRef}
          width={canvasWidth * canvasScale}
          height={canvasHeight * canvasScale}
          scaleX={canvasScale}
          scaleY={canvasScale}
          onClick={handleStageClick}
          onTap={handleStageClick}
        >
          <Layer>
            {/* Background */}
            <Rect
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHeight}
              fill={canvasBackground}
              listening={false}
            />

            {/* Elements */}
            {elements.map(renderElement)}

            {/* Transformer */}
            <Transformer
              ref={transformerRef}
              rotateEnabled
              enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
              anchorSize={8}
              anchorCornerRadius={4}
              anchorFill="white"
              anchorStroke="#8b5cf6"
              borderStroke="#8b5cf6"
              boundBoxFunc={(oldBox, newBox) => {
                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
