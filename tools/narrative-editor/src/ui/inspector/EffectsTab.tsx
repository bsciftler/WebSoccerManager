import React from 'react';
import { Event, Variable, EventEffect, EffectOp } from '../../types';

interface EffectsTabProps {
  event: Event;
  variables: Variable[];
  onUpdate: (updates: Partial<Event>) => void;
}

export const EffectsTab: React.FC<EffectsTabProps> = ({
  event,
  variables,
  onUpdate,
}) => {
  const addEffect = () => {
    const newEffect: EventEffect = {
      op: 'set',
      target: '',
      value: 0,
    };
    
    onUpdate({
      effects: [...event.effects, newEffect],
    });
  };

  const updateEffect = (index: number, updates: Partial<EventEffect>) => {
    const newEffects = [...event.effects];
    newEffects[index] = { ...newEffects[index], ...updates };
    
    onUpdate({
      effects: newEffects,
    });
  };

  const removeEffect = (index: number) => {
    const newEffects = event.effects.filter((_, i) => i !== index);
    onUpdate({
      effects: newEffects,
    });
  };

  const moveEffect = (fromIndex: number, toIndex: number) => {
    const newEffects = [...event.effects];
    const [movedEffect] = newEffects.splice(fromIndex, 1);
    newEffects.splice(toIndex, 0, movedEffect);
    
    onUpdate({
      effects: newEffects,
    });
  };

  const getValueInput = (effect: EventEffect, index: number) => {
    const targetVar = variables.find(v => v.id === effect.target);
    
    if (!targetVar) {
      return (
        <input
          type="text"
          value={String(effect.value || '')}
          onChange={(e) => updateEffect(index, { value: e.target.value })}
          placeholder="Value"
          style={{
            width: '80px',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            fontSize: '11px',
          }}
        />
      );
    }

    switch (targetVar.type) {
      case 'bool':
        return (
          <select
            value={String(effect.value)}
            onChange={(e) => updateEffect(index, { value: e.target.value === 'true' })}
            style={{
              padding: '4px 6px',
              border: '1px solid #d1d5db',
              borderRadius: '3px',
              fontSize: '11px',
            }}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        );
      
      case 'enum':
        return (
          <select
            value={String(effect.value)}
            onChange={(e) => updateEffect(index, { value: e.target.value })}
            style={{
              padding: '4px 6px',
              border: '1px solid #d1d5db',
              borderRadius: '3px',
              fontSize: '11px',
            }}
          >
            <option value="">Select...</option>
            {targetVar.constraints?.values?.map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type="number"
            value={String(effect.value || '')}
            onChange={(e) => updateEffect(index, { value: Number(e.target.value) })}
            placeholder="Value"
            min={targetVar.constraints?.min}
            max={targetVar.constraints?.max}
            style={{
              width: '80px',
              padding: '4px 6px',
              border: '1px solid #d1d5db',
              borderRadius: '3px',
              fontSize: '11px',
            }}
          />
        );
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <label style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151'
        }}>
          Effects ({event.effects.length})
        </label>
        <button
          onClick={addEffect}
          style={{
            padding: '4px 8px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer',
          }}
        >
          + Add Effect
        </button>
      </div>

      {event.effects.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#6b7280',
          fontStyle: 'italic',
          fontSize: '12px'
        }}>
          No effects defined. Click "Add Effect" to get started.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {event.effects.map((effect, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '8px',
                background: '#f9fafb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <select
                  value={effect.op}
                  onChange={(e) => updateEffect(index, { op: e.target.value as EffectOp })}
                  style={{
                    padding: '2px 4px',
                    border: '1px solid #d1d5db',
                    borderRadius: '3px',
                    fontSize: '11px',
                    background: '#ffffff',
                  }}
                >
                  <option value="set">Set</option>
                  <option value="inc">Increment</option>
                  <option value="dec">Decrement</option>
                  <option value="flag">Flag</option>
                </select>

                <select
                  value={effect.target}
                  onChange={(e) => updateEffect(index, { target: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '2px 4px',
                    border: '1px solid #d1d5db',
                    borderRadius: '3px',
                    fontSize: '11px',
                    background: '#ffffff',
                  }}
                >
                  <option value="">Select variable...</option>
                  {variables.map(variable => (
                    <option key={variable.id} value={variable.id}>
                      {variable.name} ({variable.id})
                    </option>
                  ))}
                </select>

                {effect.op !== 'flag' && getValueInput(effect, index)}

                <div style={{ display: 'flex', gap: '2px' }}>
                  {index > 0 && (
                    <button
                      onClick={() => moveEffect(index, index - 1)}
                      style={{
                        padding: '2px 4px',
                        border: '1px solid #d1d5db',
                        background: '#ffffff',
                        borderRadius: '2px',
                        fontSize: '10px',
                        cursor: 'pointer',
                      }}
                      title="Move up"
                    >
                      ↑
                    </button>
                  )}
                  {index < event.effects.length - 1 && (
                    <button
                      onClick={() => moveEffect(index, index + 1)}
                      style={{
                        padding: '2px 4px',
                        border: '1px solid #d1d5db',
                        background: '#ffffff',
                        borderRadius: '2px',
                        fontSize: '10px',
                        cursor: 'pointer',
                      }}
                      title="Move down"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    onClick={() => removeEffect(index)}
                    style={{
                      padding: '2px 4px',
                      border: '1px solid #dc2626',
                      background: '#fef2f2',
                      color: '#dc2626',
                      borderRadius: '2px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                    title="Remove effect"
                  >
                    ×
                  </button>
                </div>
              </div>

              {effect.target && !variables.find(v => v.id === effect.target) && (
                <div style={{ 
                  fontSize: '10px', 
                  color: '#dc2626',
                  marginTop: '4px'
                }}>
                  ⚠️ Undefined variable: {effect.target}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
