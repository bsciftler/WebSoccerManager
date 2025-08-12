import React, { useMemo, useState } from 'react';
import { StateCatalogue } from './StateCatalogue';
import { EventEditor } from './EventEditor';
import { InkPlaytest } from './InkPlaytest';

type TabKey = 'state' | 'events' | 'ink';

export const App: React.FC = () => {
  const [active, setActive] = useState<TabKey>('state');

  const tabs = useMemo(
    () => [
      { key: 'state' as const, label: 'State Catalogue' },
      { key: 'events' as const, label: 'Event Editor' },
      { key: 'ink' as const, label: 'Ink Playtest' },
    ],
    []
  );

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 16 }}>
      <h1>Narrative & State Editor</h1>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              background: active === t.key ? '#eef' : '#fff',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {active === 'state' && <StateCatalogue />}
      {active === 'events' && <EventEditor />}
      {active === 'ink' && <InkPlaytest />}
    </div>
  );
};


