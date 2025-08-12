import React, { useMemo } from 'react';
import { Event, Variable } from '../types';

interface WhereUsedProps {
  events: Event[];
  variables: Variable[];
  selectedVariableId?: string;
  onVariableSelect?: (variableId: string) => void;
  onEventSelect?: (eventId: string) => void;
}

interface VariableUsage {
  variableId: string;
  variableName: string;
  usages: {
    eventId: string;
    eventTitle: string;
    type: 'trigger' | 'effect';
    context: string;
  }[];
}

export const WhereUsed: React.FC<WhereUsedProps> = ({
  events,
  variables,
  selectedVariableId,
  onVariableSelect,
  onEventSelect,
}) => {
  const variableUsages = useMemo(() => {
    const usages: { [variableId: string]: VariableUsage } = {};

    // Initialize usages for all variables
    variables.forEach(variable => {
      usages[variable.id] = {
        variableId: variable.id,
        variableName: variable.name,
        usages: [],
      };
    });

    // Find all usages in events
    events.forEach(event => {
      // Check triggers
      if (event.trigger?.expr) {
        const usedVars = extractVariables(event.trigger.expr);
        usedVars.forEach(varId => {
          if (usages[varId]) {
            usages[varId].usages.push({
              eventId: event.id,
              eventTitle: event.title,
              type: 'trigger',
              context: event.trigger!.expr || '',
            });
          }
        });
      }

      // Check effects
      event.effects.forEach(effect => {
        if (effect.target && usages[effect.target]) {
          usages[effect.target].usages.push({
            eventId: event.id,
            eventTitle: event.title,
            type: 'effect',
            context: `${effect.op} ${effect.target}${effect.value !== undefined ? ` = ${effect.value}` : ''}`,
          });
        }
      });
    });

    return Object.values(usages);
  }, [events, variables]);

  const extractVariables = (expression: string): string[] => {
    const variableIds = variables.map(v => v.id);
    const usedVars = expression.match(/\b\w+\b/g) || [];
    return usedVars.filter(varName => 
      variableIds.includes(varName) && 
      !['true', 'false', 'and', 'or', 'not', '>', '<', '>=', '<=', '==', '!='].includes(varName)
    );
  };

  const getUsageTypeColor = (type: 'trigger' | 'effect') => {
    return type === 'trigger' ? '#3b82f6' : '#10b981';
  };

  const getUsageTypeIcon = (type: 'trigger' | 'effect') => {
    return type === 'trigger' ? '🔍' : '⚡';
  };

  const filteredUsages = selectedVariableId 
    ? variableUsages.filter(u => u.variableId === selectedVariableId)
    : variableUsages;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #d1d5db',
        background: '#f9fafb'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#1f2937'
        }}>
          Where Used
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '2px'
        }}>
          Variable references across events
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {filteredUsages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6b7280',
            fontStyle: 'italic',
            fontSize: '12px'
          }}>
            No variables found
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredUsages.map((usage) => (
              <div key={usage.variableId} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                {/* Variable Header */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: selectedVariableId === usage.variableId ? '#dbeafe' : '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                    cursor: 'pointer',
                  }}
                  onClick={() => onVariableSelect?.(usage.variableId)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '13px', 
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {usage.variableName}
                      </span>
                      <span style={{
                        background: '#e5e7eb',
                        color: '#6b7280',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        fontSize: '10px',
                        fontFamily: 'monospace'
                      }}>
                        {usage.variableId}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        background: usage.usages.length > 0 ? '#22c55e' : '#6b7280',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '500',
                      }}>
                        {usage.usages.length} usage{usage.usages.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usages List */}
                {usage.usages.length > 0 && (
                  <div style={{ padding: '8px 0' }}>
                    {usage.usages.map((usageItem, index) => (
                      <div
                        key={`${usageItem.eventId}-${usageItem.type}-${index}`}
                        style={{
                          padding: '6px 12px',
                          borderBottom: index < usage.usages.length - 1 ? '1px solid #f3f4f6' : 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => onEventSelect?.(usageItem.eventId)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            background: getUsageTypeColor(usageItem.type),
                            color: 'white',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: '500',
                          }}>
                            {getUsageTypeIcon(usageItem.type)} {usageItem.type}
                          </span>
                          
                          <span style={{ 
                            fontSize: '12px', 
                            fontWeight: '500',
                            color: '#374151'
                          }}>
                            {usageItem.eventTitle}
                          </span>
                        </div>
                        
                        <div style={{ 
                          fontSize: '11px', 
                          color: '#6b7280',
                          fontFamily: 'monospace',
                          background: '#f9fafb',
                          padding: '4px 6px',
                          borderRadius: '3px',
                          marginLeft: '16px'
                        }}>
                          {usageItem.context}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Usages */}
                {usage.usages.length === 0 && (
                  <div style={{ 
                    padding: '12px',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontStyle: 'italic',
                    fontSize: '11px'
                  }}>
                    Not used in any events
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ 
        padding: '8px 16px', 
        borderTop: '1px solid #d1d5db',
        background: '#f9fafb',
        fontSize: '10px',
        color: '#6b7280'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>🔍 Trigger</span>
          <span>⚡ Effect</span>
          <span>Click to select variable or event</span>
        </div>
      </div>
    </div>
  );
};
