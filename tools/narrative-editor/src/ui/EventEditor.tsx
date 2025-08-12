import React, { useMemo, useState } from 'react';

interface Trigger {
  expression: string; // e.g., "week > 2 && marco_morale < 60"
}

interface Effect {
  op: 'set' | 'inc' | 'dec' | 'flag';
  target: string; // variable or flag name
  value?: number | string | boolean;
}

interface EventDef {
  id: string;
  title: string;
  weight: number; // relative selection weight
  trigger: Trigger;
  effects: Effect[];
  inkKnot?: string; // optional link to Ink knot name
}

export const EventEditor: React.FC = () => {
  const [events, setEvents] = useState<EventDef[]>([]);
  const [draft, setDraft] = useState<EventDef>({ id: '', title: '', weight: 1, trigger: { expression: '' }, effects: [] });
  const [effectDraft, setEffectDraft] = useState<Effect>({ op: 'inc', target: '', value: 1 });

  const addEffect = () => {
    if (!effectDraft.target.trim()) return;
    setDraft((d) => ({ ...d, effects: [...d.effects, effectDraft] }));
    setEffectDraft({ op: 'inc', target: '', value: 1 });
  };

  const addEvent = () => {
    if (!draft.id.trim() || !draft.title.trim()) return;
    setEvents((e) => [...e, draft]);
    setDraft({ id: '', title: '', weight: 1, trigger: { expression: '' }, effects: [] });
  };

  const removeEvent = (id: string) => setEvents((e) => e.filter((x) => x.id !== id));

  const exportJson = useMemo(() => JSON.stringify({ events }, null, 2), [events]);

  return (
    <div>
      <h2>Event Editor</h2>
      <div style={{ display: 'grid', gap: 8, maxWidth: 900 }}>
        <input placeholder="id (unique)" value={draft.id} onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))} />
        <input placeholder="title" value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
        <input
          placeholder="ink knot (optional)"
          value={draft.inkKnot ?? ''}
          onChange={(e) => setDraft((d) => ({ ...d, inkKnot: e.target.value }))}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <label>
            weight
            <input
              type="number"
              min={1}
              value={draft.weight}
              onChange={(e) => setDraft((d) => ({ ...d, weight: Number(e.target.value) }))}
            />
          </label>
          <input
            placeholder="trigger expression (e.g., week > 2 && team_chemistry < 40)"
            value={draft.trigger.expression}
            onChange={(e) => setDraft((d) => ({ ...d, trigger: { expression: e.target.value } }))}
          />
        </div>
        <div style={{ border: '1px solid #ddd', padding: 8 }}>
          <strong>Add Effect</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <select value={effectDraft.op} onChange={(e) => setEffectDraft((s) => ({ ...s, op: e.target.value as Effect['op'] }))}>
              <option value="set">set</option>
              <option value="inc">inc</option>
              <option value="dec">dec</option>
              <option value="flag">flag</option>
            </select>
            <input placeholder="target" value={effectDraft.target} onChange={(e) => setEffectDraft((s) => ({ ...s, target: e.target.value }))} />
            <input
              placeholder="value"
              value={String(effectDraft.value ?? '')}
              onChange={(e) => {
                const raw = e.target.value;
                const num = Number(raw);
                setEffectDraft((s) => ({ ...s, value: isNaN(num) ? raw : num }));
              }}
            />
            <button onClick={addEffect}>Add</button>
          </div>
          {draft.effects.length > 0 && (
            <ul>
              {draft.effects.map((ef, idx) => (
                <li key={idx}>
                  {ef.op} {ef.target} {ef.value !== undefined ? `=> ${String(ef.value)}` : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button onClick={addEvent}>Add Event</button>
        </div>
      </div>

      <hr />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th>Weight</th>
            <th>Trigger</th>
            <th>Effects</th>
            <th>Ink</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td style={{ textAlign: 'center' }}>{ev.weight}</td>
              <td>{ev.trigger.expression}</td>
              <td>
                <ul>
                  {ev.effects.map((ef, i) => (
                    <li key={i}>
                      {ef.op} {ef.target} {ef.value !== undefined ? `=> ${String(ef.value)}` : ''}
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ textAlign: 'center' }}>{ev.inkKnot ?? ''}</td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => removeEvent(ev.id)}>Delete</button>
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


