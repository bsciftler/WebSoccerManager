import React, { useMemo, useRef, useState } from 'react';
import { Story } from 'inkjs';

interface InkState {
  story?: Story;
  output: string[];
  choices: { index: number; text: string }[];
  tags: string[];
}

export const InkPlaytest: React.FC = () => {
  const [ink, setInk] = useState<InkState>({ output: [], choices: [], tags: [] });
  const fileRef = useRef<HTMLInputElement | null>(null);

  const loadStory = async (file: File) => {
    const text = await file.text();
    const json = JSON.parse(text);
    const story = new Story(json);
    setInk({ story, output: [], choices: [], tags: [] });
  };

  const continueStory = () => {
    if (!ink.story) return;
    const output: string[] = [];
    const tags: string[] = [];
    while (ink.story.canContinue) {
      const line = ink.story.Continue().trimEnd();
      if (line) output.push(line);
      const currentTags = ink.story.currentTags ?? [];
      for (const t of currentTags) tags.push(t);
    }
    const choices = (ink.story.currentChoices ?? []).map((c) => ({ index: c.index, text: c.text }));
    setInk((s) => ({ ...s, output: [...s.output, ...output], choices, tags }));
  };

  const choose = (index: number) => {
    if (!ink.story) return;
    ink.story.ChooseChoiceIndex(index);
    continueStory();
  };

  const hasStory = useMemo(() => Boolean(ink.story), [ink.story]);

  return (
    <div>
      <h2>Ink Playtest</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void loadStory(f);
          }}
        />
        <button onClick={continueStory} disabled={!hasStory}>
          Continue
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginTop: 12 }}>
        <div>
          <h3>Output</h3>
          <div style={{ whiteSpace: 'pre-wrap', border: '1px solid #ddd', padding: 8, minHeight: 160 }}>
            {ink.output.join('\n')}
          </div>
          {ink.choices.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <h4>Choices</h4>
              <ul>
                {ink.choices.map((c) => (
                  <li key={c.index}>
                    <button onClick={() => choose(c.index)}>{c.text}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <h3>Tags</h3>
          <div style={{ border: '1px solid #ddd', padding: 8, minHeight: 160 }}>
            {ink.tags.length === 0 ? (
              <i>No tags</i>
            ) : (
              <ul>
                {ink.tags.map((t, i) => (
                  <li key={`${t}-${i}`}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


