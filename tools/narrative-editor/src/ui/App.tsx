import React, { useMemo, useState } from 'react';
import { StateCatalogue } from './StateCatalogue';
import { EventEditor } from './EventEditor';
import { InkPlaytest } from './InkPlaytest';
import { GraphEditor } from './GraphEditor';
import { Inspector } from './Inspector';
import { Outliner } from './Outliner';
import { Search } from './Search';
import { Timeline } from './Timeline';
import { WhereUsed } from './WhereUsed';
import { InkDebugger } from './InkDebugger';
import { PlaytestConsole } from './PlaytestConsole';
import { exportAllFiles } from '../utils/export';
import { Event, Variable, SearchResult } from '../types';

type TabKey = 'graph' | 'outliner' | 'timeline' | 'where-used' | 'ink-debugger' | 'playtest' | 'state' | 'events' | 'ink';

// Sample data for testing
const sampleVariables: Variable[] = [
  {
    id: 'morale',
    name: 'Team Morale',
    type: 'float',
    scope: 'team',
    initial: 0.5,
    constraints: { min: 0, max: 1 },
    description: 'Overall team morale level',
  },
  {
    id: 'week',
    name: 'Current Week',
    type: 'int',
    scope: 'global',
    initial: 1,
    constraints: { min: 1, max: 20 },
    description: 'Current week of the season',
  },
  {
    id: 'injuries',
    name: 'Active Injuries',
    type: 'int',
    scope: 'team',
    initial: 0,
    constraints: { min: 0, max: 10 },
    description: 'Number of injured players',
  },
  {
    id: 'has_rivalry',
    name: 'Has Rivalry Match',
    type: 'bool',
    scope: 'global',
    initial: false,
    description: 'Whether this week has a rivalry match',
  },
];

const sampleEvents: Event[] = [
  {
    id: 'morale_boost',
    title: 'Team Morale Boost',
    weight: 0.8,
    trigger: {
      expr: 'morale < 0.3 and week > 2',
    },
    effects: [
      { op: 'inc', target: 'morale', value: 0.2 },
    ],
    weekWindow: { from: 3, to: 10 },
    repeat: 'cooldown',
    cooldownWeeks: 3,
  },
  {
    id: 'injury_crisis',
    title: 'Injury Crisis',
    weight: 0.3,
    trigger: {
      expr: 'injuries >= 3',
    },
    effects: [
      { op: 'dec', target: 'morale', value: 0.15 },
    ],
    weekWindow: { from: 1, to: 20 },
    repeat: 'never',
  },
  {
    id: 'rivalry_week',
    title: 'Rivalry Week',
    weight: 0.9,
    trigger: {
      expr: 'has_rivalry == true',
    },
    effects: [
      { op: 'inc', target: 'morale', value: 0.1 },
    ],
    inkKnot: 'rivalry_week_start',
    weekWindow: { from: 5, to: 5 },
    repeat: 'once-per-season',
  },
];

export const App: React.FC = () => {
  const [active, setActive] = useState<TabKey>('graph');
  const [selectedEventId, setSelectedEventId] = useState<string>('morale_boost');
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [variables, setVariables] = useState<Variable[]>(sampleVariables);

  const selectedEvent = useMemo(() => 
    events.find(e => e.id === selectedEventId), 
    [events, selectedEventId]
  );

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleSearchResultSelect = (result: SearchResult) => {
    if (result.type === 'event') {
      setSelectedEventId(result.id);
      setActive('graph');
    }
  };

  const tabs = useMemo(
    () => [
      { key: 'graph' as const, label: 'Graph Editor', icon: '📊' },
      { key: 'outliner' as const, label: 'Outliner', icon: '📋' },
      { key: 'timeline' as const, label: 'Timeline', icon: '📅' },
      { key: 'where-used' as const, label: 'Where Used', icon: '🔍' },
      { key: 'ink-debugger' as const, label: 'Ink Debugger', icon: '🐛' },
      { key: 'playtest' as const, label: 'Playtest Console', icon: '🎮' },
      { key: 'state' as const, label: 'State Catalogue', icon: '🔧' },
      { key: 'events' as const, label: 'Event Editor', icon: '⚡' },
      { key: 'ink' as const, label: 'Ink Playtest', icon: '📖' },
    ],
    []
  );

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: '16px', 
        borderBottom: '1px solid #d1d5db',
        background: '#f9fafb'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#1f2937' }}>
          Narrative & State Editor
        </h1>
        <div style={{ 
          marginTop: '8px', 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center' 
        }}>
          <div style={{ flex: 1 }}>
            <Search 
              events={events}
              variables={variables}
              onResultSelect={handleSearchResultSelect}
            />
          </div>
          <button
            onClick={() => exportAllFiles(variables, events)}
            style={{
              padding: '8px 16px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            📦 Export Bundle
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        gap: 2, 
        padding: '8px 16px',
        borderBottom: '1px solid #d1d5db',
        background: '#ffffff'
      }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding: '8px 12px',
              border: 'none',
              background: active === t.key ? '#3b82f6' : 'transparent',
              color: active === t.key ? '#ffffff' : '#6b7280',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {active === 'graph' && (
          <>
            {/* Graph Editor */}
            <div style={{ flex: 1, padding: '16px' }}>
              <GraphEditor
                events={events}
                onSelectionChange={(selectedIds) => {
                  if (selectedIds.length > 0) {
                    setSelectedEventId(selectedIds[0]);
                  }
                }}
                onNodeDoubleClick={(nodeId) => {
                  setSelectedEventId(nodeId);
                }}
              />
            </div>
            
            {/* Inspector */}
            <div style={{ width: '320px', padding: '16px', borderLeft: '1px solid #d1d5db' }}>
              <Inspector
                selectedEvent={selectedEvent}
                variables={variables}
                onEventUpdate={handleEventUpdate}
              />
            </div>
          </>
        )}

        {active === 'outliner' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <Outliner
              events={events}
              variables={variables}
              selectedEventId={selectedEventId}
              onEventSelect={setSelectedEventId}
              onEventDoubleClick={(eventId) => {
                setSelectedEventId(eventId);
                setActive('graph');
              }}
            />
          </div>
        )}

        {active === 'timeline' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <Timeline
              events={events}
              variables={variables}
              onEventUpdate={handleEventUpdate}
              onEventSelect={setSelectedEventId}
            />
          </div>
        )}

        {active === 'where-used' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <WhereUsed
              events={events}
              variables={variables}
              onVariableSelect={(variableId) => {
                // Could navigate to variable editor in future
                console.log('Selected variable:', variableId);
              }}
              onEventSelect={(eventId) => {
                setSelectedEventId(eventId);
                setActive('graph');
              }}
            />
          </div>
        )}

        {active === 'ink-debugger' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <InkDebugger
              onStoryLoad={(story) => {
                console.log('Story loaded:', story);
              }}
              onVariableChange={(variableId, value) => {
                console.log('Variable changed:', variableId, value);
              }}
            />
          </div>
        )}

        {active === 'playtest' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <PlaytestConsole
              events={events}
              variables={variables}
              onStateChange={(updatedVariables) => {
                setVariables(updatedVariables);
              }}
            />
          </div>
        )}

        {active === 'state' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <StateCatalogue />
          </div>
        )}

        {active === 'events' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <EventEditor />
          </div>
        )}

        {active === 'ink' && (
          <div style={{ flex: 1, padding: '16px' }}>
            <InkPlaytest />
          </div>
        )}
      </div>
    </div>
  );
};


