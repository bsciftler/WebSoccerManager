import React from 'react';
import { Event, RepeatPolicy } from '../../types';

interface MetaTabProps {
  event: Event;
  onUpdate: (updates: Partial<Event>) => void;
}

export const MetaTab: React.FC<MetaTabProps> = ({
  event,
  onUpdate,
}) => {
  const updateField = (field: keyof Event, value: any) => {
    onUpdate({ [field]: value });
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '6px'
        }}>
          Title
        </label>
        <input
          type="text"
          value={event.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Event title"
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        />
      </div>

      {/* Weight */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '6px'
        }}>
          Weight ({Math.round(event.weight * 100)}%)
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={event.weight}
          onChange={(e) => updateField('weight', Number(e.target.value))}
          style={{
            width: '100%',
            marginBottom: '4px',
          }}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#6b7280'
        }}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Week Window */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '6px'
        }}>
          Week Window
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="number"
            min="1"
            max="20"
            value={event.weekWindow?.from || ''}
            onChange={(e) => updateField('weekWindow', {
              ...event.weekWindow,
              from: Number(e.target.value),
            })}
            placeholder="From"
            style={{
              width: '60px',
              padding: '4px 6px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '11px',
            }}
          />
          <span style={{ fontSize: '12px', color: '#6b7280' }}>to</span>
          <input
            type="number"
            min="1"
            max="20"
            value={event.weekWindow?.to || ''}
            onChange={(e) => updateField('weekWindow', {
              ...event.weekWindow,
              to: Number(e.target.value),
            })}
            placeholder="To"
            style={{
              width: '60px',
              padding: '4px 6px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '11px',
            }}
          />
          <button
            onClick={() => updateField('weekWindow', undefined)}
            style={{
              padding: '2px 6px',
              border: '1px solid #d1d5db',
              background: '#f9fafb',
              borderRadius: '3px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Repeat Policy */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '6px'
        }}>
          Repeat Policy
        </label>
        <select
          value={event.repeat || 'never'}
          onChange={(e) => updateField('repeat', e.target.value as RepeatPolicy)}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          <option value="never">Never</option>
          <option value="once-per-season">Once per season</option>
          <option value="cooldown">Cooldown</option>
        </select>
        
        {event.repeat === 'cooldown' && (
          <div style={{ marginTop: '8px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#374151',
              marginBottom: '4px'
            }}>
              Cooldown (weeks)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={event.cooldownWeeks || 1}
              onChange={(e) => updateField('cooldownWeeks', Number(e.target.value))}
              style={{
                width: '80px',
                padding: '4px 6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '11px',
              }}
            />
          </div>
        )}
      </div>

      {/* Ink Knot Link */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '6px'
        }}>
          Ink Story Knot
        </label>
        <input
          type="text"
          value={event.inkKnot || ''}
          onChange={(e) => updateField('inkKnot', e.target.value || undefined)}
          placeholder="knot_name (optional)"
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        />
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '4px'
        }}>
          Link to an Ink story knot for narrative content
        </div>
      </div>

      {/* Event ID (read-only) */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '6px'
        }}>
          Event ID
        </label>
        <input
          type="text"
          value={event.id}
          readOnly
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            background: '#f9fafb',
            color: '#6b7280',
          }}
        />
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '4px'
        }}>
          Unique identifier (cannot be changed)
        </div>
      </div>
    </div>
  );
};
