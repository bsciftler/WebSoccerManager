import React, { useState, useMemo } from 'react';
import { Event, Variable } from '../types';

interface PlaytestConsoleProps {
  events: Event[];
  variables: Variable[];
  onStateChange?: (variables: Variable[]) => void;
}

interface StateDiff {
  variableId: string;
  variableName: string;
  before: any;
  after: any;
  changed: boolean;
}

interface WeekSimulation {
  week: number;
  triggeredEvents: Event[];
  stateDiffs: StateDiff[];
  timestamp: number;
}

export const PlaytestConsole: React.FC<PlaytestConsoleProps> = ({
  events,
  variables,
  onStateChange,
}) => {
  const [currentState, setCurrentState] = useState<{ [id: string]: any }>(() => {
    const initialState: { [id: string]: any } = {};
    variables.forEach(v => {
      initialState[v.id] = v.initial;
    });
    return initialState;
  });

  const [simulationHistory, setSimulationHistory] = useState<WeekSimulation[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const evaluateTrigger = (event: Event): boolean => {
    if (!event.trigger?.expr) return true;
    
    try {
      // Create a safe evaluation context
      const context: { [key: string]: any } = { ...currentState };
      
      // Add some helper functions
      context.true = true;
      context.false = false;
      
      // Simple expression evaluator (in production, use a proper parser)
      const expr = event.trigger.expr;
      
      // Replace variable names with their values
      let evaluatedExpr = expr;
      Object.entries(context).forEach(([varName, value]) => {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        evaluatedExpr = evaluatedExpr.replace(regex, JSON.stringify(value));
      });
      
      // Replace operators
      evaluatedExpr = evaluatedExpr
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\b/g, '!')
        .replace(/==/g, '===')
        .replace(/!=/g, '!==');
      
      // Evaluate the expression
      return eval(evaluatedExpr);
    } catch (error) {
      console.error('Error evaluating trigger:', error);
      return false;
    }
  };

  const applyEffects = (event: Event): StateDiff[] => {
    const diffs: StateDiff[] = [];
    
    event.effects.forEach(effect => {
      const before = currentState[effect.target];
      let after = before;
      
      switch (effect.op) {
        case 'set':
          after = effect.value;
          break;
        case 'inc':
          after = (before || 0) + (effect.value || 0);
          break;
        case 'dec':
          after = (before || 0) - (Number(effect.value) || 0);
          break;
        case 'flag':
          after = true;
          break;
      }
      
      // Apply constraints
      const variable = variables.find(v => v.id === effect.target);
      if (variable?.constraints) {
        if (typeof after === 'number') {
          if (variable.constraints.min !== undefined) {
            after = Math.max(after, variable.constraints.min);
          }
          if (variable.constraints.max !== undefined) {
            after = Math.min(after, variable.constraints.max);
          }
        }
      }
      
      diffs.push({
        variableId: effect.target,
        variableName: variable?.name || effect.target,
        before,
        after,
        changed: before !== after,
      });
      
      // Update state
      setCurrentState(prev => ({ ...prev, [effect.target]: after }));
    });
    
    return diffs;
  };

  const simulateWeek = () => {
    const weekEvents = events.filter(event => {
      // Check if event is available this week
      if (event.weekWindow) {
        if (currentWeek < event.weekWindow.from || currentWeek > event.weekWindow.to) {
          return false;
        }
      }
      
      // Check repeat policies
      if (event.repeat === 'once-per-season') {
        const hasRun = simulationHistory.some(sim => 
          sim.triggeredEvents.some(e => e.id === event.id)
        );
        if (hasRun) return false;
      }
      
      if (event.repeat === 'cooldown') {
        const lastRun = simulationHistory
          .slice()
          .reverse()
          .find(sim => sim.triggeredEvents.some(e => e.id === event.id));
        if (lastRun && currentWeek - lastRun.week < (event.cooldownWeeks || 1)) {
          return false;
        }
      }
      
      return true;
    });

    // Evaluate triggers and collect triggered events
    const triggeredEvents: Event[] = [];
    const allDiffs: StateDiff[] = [];
    
    weekEvents.forEach(event => {
      if (evaluateTrigger(event)) {
        triggeredEvents.push(event);
        const diffs = applyEffects(event);
        allDiffs.push(...diffs);
      }
    });

    const simulation: WeekSimulation = {
      week: currentWeek,
      triggeredEvents,
      stateDiffs: allDiffs,
      timestamp: Date.now(),
    };

    setSimulationHistory(prev => [...prev, simulation]);
    setCurrentWeek(prev => prev + 1);
    onStateChange?.(variables.map(v => ({ ...v, initial: currentState[v.id] })));
  };

  const resetSimulation = () => {
    const initialState: { [id: string]: any } = {};
    variables.forEach(v => {
      initialState[v.id] = v.initial;
    });
    setCurrentState(initialState);
    setSimulationHistory([]);
    setCurrentWeek(1);
    setSelectedWeek(null);
  };

  const getStateDiffColor = (diff: StateDiff) => {
    if (!diff.changed) return '#6b7280';
    if (typeof diff.after === 'number' && typeof diff.before === 'number') {
      return diff.after > diff.before ? '#10b981' : '#ef4444';
    }
    return '#3b82f6';
  };

  const selectedSimulation = selectedWeek 
    ? simulationHistory.find(sim => sim.week === selectedWeek)
    : null;

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
          Playtest Console
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '2px'
        }}>
          Week {currentWeek} • {simulationHistory.length} weeks simulated
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #d1d5db',
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={simulateWeek}
            style={{
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            ▶️ Simulate Week {currentWeek}
          </button>
          <button
            onClick={resetSimulation}
            style={{
              padding: '8px 16px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Current State & History */}
        <div style={{ width: '300px', borderRight: '1px solid #d1d5db', display: 'flex', flexDirection: 'column' }}>
          {/* Current State */}
          <div style={{ flex: 1, padding: '12px', borderBottom: '1px solid #d1d5db' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
              Current State
            </div>
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
              {variables.map(variable => (
                <div key={variable.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 0',
                  fontSize: '11px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <span style={{ color: '#374151' }}>{variable.name}</span>
                  <span style={{ 
                    fontFamily: 'monospace',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    {String(currentState[variable.id])}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulation History */}
          <div style={{ flex: 1, padding: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
              Simulation History
            </div>
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
              {simulationHistory.length === 0 ? (
                <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic' }}>
                  No weeks simulated yet
                </div>
              ) : (
                simulationHistory.map(sim => (
                  <div
                    key={sim.week}
                    style={{
                      padding: '6px 8px',
                      background: selectedWeek === sim.week ? '#dbeafe' : 'transparent',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      marginBottom: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                    }}
                    onClick={() => setSelectedWeek(selectedWeek === sim.week ? null : sim.week)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '500' }}>Week {sim.week}</span>
                      <span style={{
                        background: sim.triggeredEvents.length > 0 ? '#10b981' : '#6b7280',
                        color: 'white',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        fontSize: '10px',
                      }}>
                        {sim.triggeredEvents.length} events
                      </span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>
                      {sim.stateDiffs.filter(d => d.changed).length} changes
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Week Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedSimulation ? (
            <>
              {/* Week Header */}
              <div style={{ padding: '12px', borderBottom: '1px solid #d1d5db' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  Week {selectedSimulation.week}
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>
                  {selectedSimulation.triggeredEvents.length} events triggered
                </div>
              </div>

              {/* Triggered Events */}
              <div style={{ flex: 1, padding: '12px', borderBottom: '1px solid #d1d5db' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                  Triggered Events
                </div>
                <div style={{ maxHeight: '150px', overflow: 'auto' }}>
                  {selectedSimulation.triggeredEvents.length === 0 ? (
                    <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic' }}>
                      No events triggered this week
                    </div>
                  ) : (
                    selectedSimulation.triggeredEvents.map(event => (
                      <div key={event.id} style={{
                        padding: '6px 8px',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        fontSize: '11px',
                      }}>
                        <div style={{ fontWeight: '500', color: '#374151' }}>
                          {event.title}
                        </div>
                        <div style={{ fontSize: '10px', color: '#6b7280', fontFamily: 'monospace' }}>
                          {event.id}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* State Changes */}
              <div style={{ flex: 1, padding: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                  State Changes
                </div>
                <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                  {selectedSimulation.stateDiffs.length === 0 ? (
                    <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic' }}>
                      No state changes this week
                    </div>
                  ) : (
                    selectedSimulation.stateDiffs.map((diff, index) => (
                      <div key={`${diff.variableId}-${index}`} style={{
                        padding: '6px 8px',
                        background: diff.changed ? '#f0fdf4' : '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        fontSize: '11px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '500', color: '#374151' }}>
                            {diff.variableName}
                          </span>
                          <span style={{
                            background: getStateDiffColor(diff),
                            color: 'white',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            fontSize: '10px',
                          }}>
                            {diff.changed ? 'Changed' : 'Unchanged'}
                          </span>
                        </div>
                        {diff.changed && (
                          <div style={{ 
                            fontSize: '10px', 
                            color: '#6b7280',
                            fontFamily: 'monospace',
                            marginTop: '2px'
                          }}>
                            {String(diff.before)} → {String(diff.after)}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '12px',
              fontStyle: 'italic'
            }}>
              Select a week from the history to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
