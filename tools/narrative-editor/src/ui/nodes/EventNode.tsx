import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Event } from '../../types';

interface EventNodeData {
  event: Event;
}

export const EventNode: React.FC<NodeProps<EventNodeData>> = ({ data, selected }) => {
  const { event } = data;
  
  const getWeightColor = (weight: number) => {
    if (weight >= 0.7) return '#22c55e'; // green
    if (weight >= 0.4) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getWeekWindowText = () => {
    if (!event.weekWindow) return '';
    return `W${event.weekWindow.from}-${event.weekWindow.to}`;
  };

  return (
    <div
      style={{
        background: selected ? '#e0f2fe' : '#ffffff',
        border: selected ? '2px solid #0284c7' : '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '180px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Handle type="target" position={Position.Top} />
      
      <div style={{ marginBottom: '8px' }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#1f2937',
          marginBottom: '4px'
        }}>
          {event.title}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          fontFamily: 'monospace'
        }}>
          {event.id}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <div
          style={{
            background: getWeightColor(event.weight),
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '500',
          }}
        >
          {Math.round(event.weight * 100)}%
        </div>
        
        {event.weekWindow && (
          <div
            style={{
              background: '#6366f1',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '500',
            }}
          >
            {getWeekWindowText()}
          </div>
        )}
      </div>

      <div style={{ fontSize: '11px', color: '#6b7280' }}>
        {event.effects.length} effect{event.effects.length !== 1 ? 's' : ''}
        {event.inkKnot && (
          <span style={{ marginLeft: '8px', color: '#8b5cf6' }}>
            📖 {event.inkKnot}
          </span>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
