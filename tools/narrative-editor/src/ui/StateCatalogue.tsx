import React, { useMemo, useState } from 'react';

type VariableScope = 'global' | 'team' | 'player' | 'coach';
type VariableType = 'int' | 'float' | 'bool' | 'string';

interface StateVar {
  name: string;
  type: VariableType;
  scope: VariableScope;
  initial: number | boolean | string;
  description?: string;
}

export const StateCatalogue: React.FC = () => {
  const [vars, setVars] = useState<StateVar[]>([
    { name: 'team_chemistry', type: 'int', scope: 'team', initial: 50, description: 'Overall team cohesion (0-100)' },
  ]);

  const [draft, setDraft] = useState<StateVar>({ name: '', type: 'int', scope: 'global', initial: 0 });

  const addVar = () => {
    if (!draft.name.trim()) return;
    setVars((v) => [...v, draft]);
    setDraft({ name: '', type: 'int', scope: 'global', initial: 0 });
  };

  const removeVar = (name: string) => setVars((v) => v.filter((x) => x.name !== name));

  const exportJson = useMemo(() => JSON.stringify({ variables: vars }, null, 2), [vars]);

  return (
    <div>
      <h2>State Catalogue</h2>
      <div style={{ display: 'grid', gap: 8, maxWidth: 800 }}>
        <input
          placeholder="name (e.g., marco_morale)"
          value={draft.name}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <select
            value={draft.type}
            onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as VariableType }))}
          >
            <option value="int">int</option>
            <option value="float">float</option>
            <option value="bool">bool</option>
            <option value="string">string</option>
          </select>
          <select
            value={draft.scope}
            onChange={(e) => setDraft((d) => ({ ...d, scope: e.target.value as VariableScope }))}
          >
            <option value="global">global</option>
            <option value="team">team</option>
            <option value="player">player</option>
            <option value="coach">coach</option>
          </select>
          <input
            placeholder="initial value"
            value={String(draft.initial)}
            onChange={(e) => {
              const raw = e.target.value;
              let parsed: any = raw;
              if (draft.type === 'int' || draft.type === 'float') parsed = Number(raw);
              if (draft.type === 'bool') parsed = raw === 'true';
              setDraft((d) => ({ ...d, initial: parsed }));
            }}
          />
        </div>
        <input
          placeholder="description (optional)"
          value={draft.description ?? ''}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
        />
        <div>
          <button onClick={addVar}>Add Variable</button>
        </div>
      </div>
      <hr />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th>Type</th>
            <th>Scope</th>
            <th>Initial</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vars.map((v) => (
            <tr key={v.name}>
              <td>{v.name}</td>
              <td style={{ textAlign: 'center' }}>{v.type}</td>
              <td style={{ textAlign: 'center' }}>{v.scope}</td>
              <td style={{ textAlign: 'center' }}>{String(v.initial)}</td>
              <td>{v.description ?? ''}</td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => removeVar(v.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Export</h3>
      <textarea readOnly rows={12} style={{ width: '100%' }} value={exportJson} />
    </div>
  );
};


