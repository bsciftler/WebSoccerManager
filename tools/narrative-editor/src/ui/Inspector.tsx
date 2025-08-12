import React, { useState } from 'react';
import { Event, Variable, EventEffect, TriggerAst } from '../types';
import { EventSchema } from '../types';
import { TriggerTab } from './inspector/TriggerTab';
import { EffectsTab } from './inspector/EffectsTab';
import { MetaTab } from './inspector/MetaTab';

interface InspectorProps {
  selectedEvent?: Event;
  variables: Variable[];
  onEventUpdate?: (event: Event) => void;
}

type TabKey = 'trigger' | 'effects' | 'meta';

export const Inspector: React.FC<InspectorProps> = ({
  selectedEvent,
  variables,
  onEventUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('trigger');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const tabs = [
    { key: 'trigger' as const, label: 'Trigger', icon: '🔍' },
    { key: 'effects' as const, label: 'Effects', icon: '⚡' },
    { key: 'meta' as const, label: 'Meta', icon: '📋' },
  ];

  const handleEventUpdate = (updatedEvent: Partial<Event>) => {
    if (!selectedEvent || !onEventUpdate) return;

    const newEvent = { ...selectedEvent, ...updatedEvent };
    
    // Validate the updated event
    try {
      EventSchema.parse(newEvent);
      setValidationErrors([]);
      onEventUpdate(newEvent);
    } catch (error) {
      if (error instanceof Error) {
        setValidationErrors([error.message]);
      }
    }
  };

  if (!selectedEvent) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#6b7280',
        fontStyle: 'italic'
      }}>
        Select an event to edit its properties
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #d1d5db',
        background: '#f9fafb'
      }}>
        <div style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#1f2937',
          marginBottom: '4px'
        }}>
          {selectedEvent.title}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          fontFamily: 'monospace'
        }}>
          {selectedEvent.id}
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div style={{ 
          padding: '8px 16px', 
          background: '#fef2f2', 
          borderBottom: '1px solid #fecaca'
        }}>
          {validationErrors.map((error, index) => (
            <div key={index} style={{ 
              fontSize: '12px', 
              color: '#dc2626',
              marginBottom: '4px'
            }}>
              ⚠️ {error}
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #d1d5db',
        background: '#f9fafb'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              background: activeTab === tab.key ? '#ffffff' : 'transparent',
              borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              color: activeTab === tab.key ? '#1f2937' : '#6b7280',
            }}
          >
            <span style={{ marginRight: '4px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'trigger' && (
          <TriggerTab
            event={selectedEvent}
            variables={variables}
            onUpdate={handleEventUpdate}
          />
        )}
        {activeTab === 'effects' && (
          <EffectsTab
            event={selectedEvent}
            variables={variables}
            onUpdate={handleEventUpdate}
          />
        )}
        {activeTab === 'meta' && (
          <MetaTab
            event={selectedEvent}
            onUpdate={handleEventUpdate}
          />
        )}
      </div>
    </div>
  );
};
