import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface KnotNodeData {
  knotId: string;
  title: string;
  tags?: string[];
}

export const KnotNode: React.FC<NodeProps<KnotNodeData>> = ({ data, selected }) => {
  const { knotId, title, tags = [] } = data;

  return (
    <div
      style={{
        background: selected ? '#fef3c7' : '#fefce8',
        border: selected ? '2px solid #f59e0b' : '1px solid #fbbf24',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '160px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Handle type="target" position={Position.Top} />
      
      <div style={{ marginBottom: '8px' }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#92400e',
          marginBottom: '4px'
        }}>
          📖 {title}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#a16207',
          fontFamily: 'monospace'
        }}>
          {knotId}
        </div>
      </div>

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
          {tags.slice(0, 3).map((tag, index) => (
            <div
              key={index}
              style={{
                background: '#8b5cf6',
                color: 'white',
                padding: '1px 4px',
                borderRadius: '3px',
                fontSize: '10px',
                fontWeight: '500',
              }}
            >
              {tag}
            </div>
          ))}
          {tags.length > 3 && (
            <div style={{ fontSize: '10px', color: '#a16207' }}>
              +{tags.length - 3} more
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: '11px', color: '#a16207' }}>
        Ink Story Knot
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
