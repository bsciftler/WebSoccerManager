import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface GroupNodeData {
  title: string;
  weekRange?: string;
  eventCount: number;
}

export const GroupNode: React.FC<NodeProps<GroupNodeData>> = ({ data, selected }) => {
  const { title, weekRange, eventCount } = data;

  return (
    <div
      style={{
        background: selected ? '#dbeafe' : '#eff6ff',
        border: selected ? '2px solid #3b82f6' : '1px solid #93c5fd',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '140px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Handle type="target" position={Position.Top} />
      
      <div style={{ marginBottom: '8px' }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#1e40af',
          marginBottom: '4px'
        }}>
          📁 {title}
        </div>
        {weekRange && (
          <div style={{ 
            fontSize: '12px', 
            color: '#3b82f6',
            fontWeight: '500'
          }}>
            {weekRange}
          </div>
        )}
      </div>

      <div style={{ 
        fontSize: '11px', 
        color: '#1e40af',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>📊</span>
        {eventCount} event{eventCount !== 1 ? 's' : ''}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
