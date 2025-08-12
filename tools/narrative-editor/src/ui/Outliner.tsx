import React, { useState } from 'react';
import { Event, Variable } from '../types';

interface OutlinerProps {
  events: Event[];
  variables: Variable[];
  selectedEventId?: string;
  onEventSelect?: (eventId: string) => void;
  onEventDoubleClick?: (eventId: string) => void;
}

interface WeekGroup {
  week: number;
  events: Event[];
}

export const Outliner: React.FC<OutlinerProps> = ({
  events,
  variables,
  selectedEventId,
  onEventSelect,
  onEventDoubleClick,
}) => {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1, 2, 3]));

  // Group events by week
  const weekGroups: WeekGroup[] = React.useMemo(() => {
    const groups: { [week: number]: Event[] } = {};
    
    events.forEach(event => {
      const week = event.weekWindow?.from || 1;
      if (!groups[week]) {
        groups[week] = [];
      }
      groups[week].push(event);
    });

    return Object.entries(groups)
      .map(([week, events]) => ({ week: Number(week), events }))
      .sort((a, b) => a.week - b.week);
  }, [events]);

  const toggleWeek = (week: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(week)) {
      newExpanded.delete(week);
    } else {
      newExpanded.add(week);
    }
    setExpandedWeeks(newExpanded);
  };

  const getEventStatus = (event: Event) => {
    const errors: string[] = [];
    
    // Check for undefined variables in trigger
    if (event.trigger?.expr) {
      const variableIds = variables.map(v => v.id);
      const usedVars = event.trigger.expr.match(/\b\w+\b/g) || [];
      usedVars.forEach(varName => {
        if (!variableIds.includes(varName) && 
            !['true', 'false', 'and', 'or', 'not', '>', '<', '>=', '<=', '==', '!='].includes(varName)) {
          errors.push(`Undefined variable: ${varName}`);
        }
      });
    }

    // Check for undefined variables in effects
    event.effects.forEach(effect => {
      if (effect.target && !variables.find(v => v.id === effect.target)) {
        errors.push(`Undefined variable: ${effect.target}`);
      }
    });

    return errors;
  };

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
          Season Outliner
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '2px'
        }}>
          {events.length} events across {weekGroups.length} weeks
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
        {weekGroups.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            color: '#6b7280',
            fontStyle: 'italic',
            fontSize: '12px'
          }}>
            No events defined
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {weekGroups.map(({ week, events: weekEvents }) => (
              <div key={week} style={{ border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                {/* Week Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#f9fafb',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => toggleWeek(week)}
                >
                  <span style={{ 
                    marginRight: '8px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {expandedWeeks.has(week) ? '▼' : '▶'}
                  </span>
                  <span style={{ 
                    fontSize: '13px', 
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Week {week}
                  </span>
                  <span style={{ 
                    marginLeft: 'auto',
                    fontSize: '11px',
                    color: '#6b7280',
                    background: '#e5e7eb',
                    padding: '2px 6px',
                    borderRadius: '8px'
                  }}>
                    {weekEvents.length} event{weekEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Week Events */}
                {expandedWeeks.has(week) && (
                  <div style={{ padding: '4px 0' }}>
                    {weekEvents.map((event) => {
                      const errors = getEventStatus(event);
                      const isSelected = selectedEventId === event.id;
                      
                      return (
                        <div
                          key={event.id}
                          style={{
                            padding: '6px 12px 6px 32px',
                            background: isSelected ? '#dbeafe' : 'transparent',
                            borderLeft: isSelected ? '3px solid #3b82f6' : 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                          onClick={() => onEventSelect?.(event.id)}
                          onDoubleClick={() => onEventDoubleClick?.(event.id)}
                        >
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span style={{ 
                              fontWeight: '500',
                              color: isSelected ? '#1e40af' : '#374151'
                            }}>
                              {event.title}
                            </span>
                            
                            {/* Weight badge */}
                            <span style={{
                              background: event.weight >= 0.7 ? '#22c55e' : 
                                        event.weight >= 0.4 ? '#eab308' : '#ef4444',
                              color: 'white',
                              padding: '1px 4px',
                              borderRadius: '3px',
                              fontSize: '10px',
                              fontWeight: '500',
                            }}>
                              {Math.round(event.weight * 100)}%
                            </span>

                            {/* Error indicator */}
                            {errors.length > 0 && (
                              <span style={{
                                background: '#ef4444',
                                color: 'white',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                fontSize: '10px',
                                fontWeight: '500',
                              }}>
                                ⚠️ {errors.length}
                              </span>
                            )}

                            {/* Ink knot indicator */}
                            {event.inkKnot && (
                              <span style={{
                                background: '#8b5cf6',
                                color: 'white',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                fontSize: '10px',
                                fontWeight: '500',
                              }}>
                                📖
                              </span>
                            )}
                          </div>

                          <div style={{ 
                            fontSize: '11px', 
                            color: '#6b7280',
                            marginTop: '2px',
                            fontFamily: 'monospace'
                          }}>
                            {event.id}
                          </div>

                          {/* Error details */}
                          {errors.length > 0 && (
                            <div style={{ 
                              marginTop: '4px',
                              padding: '4px 6px',
                              background: '#fef2f2',
                              border: '1px solid #fecaca',
                              borderRadius: '3px'
                            }}>
                              {errors.map((error, index) => (
                                <div key={index} style={{ 
                                  fontSize: '10px', 
                                  color: '#dc2626'
                                }}>
                                  {error}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
