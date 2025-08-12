import React, { useState, useMemo } from 'react';
import { Event, Variable } from '../types';

interface TimelineProps {
  events: Event[];
  variables: Variable[];
  onEventUpdate?: (event: Event) => void;
  onEventSelect?: (eventId: string) => void;
}

interface WeekData {
  week: number;
  events: Event[];
  totalWeight: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  variables,
  onEventUpdate,
  onEventSelect,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);

  const weekData = useMemo(() => {
    const weeks: { [week: number]: Event[] } = {};
    
    // Group events by week
    events.forEach(event => {
      const week = event.weekWindow?.from || 1;
      if (!weeks[week]) {
        weeks[week] = [];
      }
      weeks[week].push(event);
    });

    // Convert to array and calculate total weights
    return Object.entries(weeks).map(([week, weekEvents]) => ({
      week: Number(week),
      events: weekEvents,
      totalWeight: weekEvents.reduce((sum, event) => sum + event.weight, 0),
    })).sort((a, b) => a.week - b.week);
  }, [events]);

  const handleEventDragStart = (eventId: string) => {
    setDraggedEvent(eventId);
  };

  const handleWeekDrop = (week: number) => {
    if (draggedEvent && onEventUpdate) {
      const event = events.find(e => e.id === draggedEvent);
      if (event) {
        onEventUpdate({
          ...event,
          weekWindow: { from: week, to: week },
        });
      }
    }
    setDraggedEvent(null);
  };

  const handleWeekDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleWeightChange = (eventId: string, newWeight: number) => {
    if (onEventUpdate) {
      const event = events.find(e => e.id === eventId);
      if (event) {
        onEventUpdate({
          ...event,
          weight: Math.max(0, Math.min(1, newWeight)),
        });
      }
    }
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 0.7) return '#22c55e';
    if (weight >= 0.4) return '#eab308';
    return '#ef4444';
  };

  const getWeekConflicts = (week: number) => {
    const weekEvents = weekData.find(w => w.week === week)?.events || [];
    const conflicts: string[] = [];
    
    // Check for overlapping week windows
    weekEvents.forEach(event1 => {
      weekEvents.forEach(event2 => {
        if (event1.id !== event2.id) {
          const overlap1 = event1.weekWindow && 
            week >= event1.weekWindow.from && week <= event1.weekWindow.to;
          const overlap2 = event2.weekWindow && 
            week >= event2.weekWindow.from && week <= event2.weekWindow.to;
          
          if (overlap1 && overlap2) {
            conflicts.push(`${event1.title} overlaps with ${event2.title}`);
          }
        }
      });
    });

    return conflicts;
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
          Week Timeline
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '2px'
        }}>
          {events.length} events across {weekData.length} weeks
        </div>
      </div>

      {/* Timeline Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {weekData.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6b7280',
            fontStyle: 'italic',
            fontSize: '12px'
          }}>
            No events with week windows defined
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {weekData.map(({ week, events: weekEvents, totalWeight }) => {
              const conflicts = getWeekConflicts(week);
              const isSelected = selectedWeek === week;
              
              return (
                <div
                  key={week}
                  style={{
                    border: `1px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                    borderRadius: '6px',
                    background: isSelected ? '#eff6ff' : '#ffffff',
                    padding: '12px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedWeek(isSelected ? null : week)}
                  onDragOver={handleWeekDragOver}
                  onDrop={() => handleWeekDrop(week)}
                >
                  {/* Week Header */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Week {week}
                      </span>
                      <span style={{
                        background: '#e5e7eb',
                        color: '#6b7280',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}>
                        {weekEvents.length} event{weekEvents.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>
                        Total Weight:
                      </span>
                      <span style={{
                        background: getWeightColor(totalWeight),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                      }}>
                        {Math.round(totalWeight * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Conflicts Warning */}
                  {conflicts.length > 0 && (
                    <div style={{ 
                      marginBottom: '8px',
                      padding: '6px 8px',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '4px'
                    }}>
                      <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: '500' }}>
                        ⚠️ Conflicts detected
                      </div>
                      {conflicts.slice(0, 2).map((conflict, index) => (
                        <div key={index} style={{ fontSize: '10px', color: '#dc2626' }}>
                          {conflict}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Week Events */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {weekEvents.map((event) => (
                      <div
                        key={event.id}
                        draggable
                        onDragStart={() => handleEventDragStart(event.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventSelect?.(event.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 8px',
                          background: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          cursor: 'grab',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: '12px', 
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {event.title}
                          </div>
                          <div style={{ 
                            fontSize: '10px', 
                            color: '#6b7280',
                            fontFamily: 'monospace'
                          }}>
                            {event.id}
                          </div>
                        </div>

                        {/* Weight Slider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: '120px' }}>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={event.weight}
                            onChange={(e) => handleWeightChange(event.id, Number(e.target.value))}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              flex: 1,
                              height: '4px',
                            }}
                          />
                          <span style={{
                            background: getWeightColor(event.weight),
                            color: 'white',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: '500',
                            minWidth: '32px',
                            textAlign: 'center',
                          }}>
                            {Math.round(event.weight * 100)}%
                          </span>
                        </div>

                        {/* Week Window */}
                        {event.weekWindow && (
                          <div style={{
                            background: '#6366f1',
                            color: 'white',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: '500',
                          }}>
                            W{event.weekWindow.from}-{event.weekWindow.to}
                          </div>
                        )}

                        {/* Ink Knot Indicator */}
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
                    ))}
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
