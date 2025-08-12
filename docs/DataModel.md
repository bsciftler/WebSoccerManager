## Data Model & Schemas

TypeScript-style interfaces to guide implementation.

```ts
export type TraitId = string;

export interface Trait {
  id: TraitId;
  name: string; // e.g., "Natural Leader", "Hot-Headed"
  kind: 'positive' | 'negative';
  description: string;
  tags?: string[]; // optional categories
}

export interface PlayerSkills {
  technical: { passing: number; shooting: number; dribbling: number; tackling: number };
  mental: { composure: number; positioning: number; workRate: number };
  physical: { pace: number; stamina: number; strength: number };
}

export interface Player {
  id: string;
  name: string;
  portraitKey?: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  skills: PlayerSkills; // 1–20 scale
  morale: number; // 0–100
  fatigue: number; // 0–100
  chemistry: number; // hidden 0–100
  traits: { positive: TraitId[]; negative: TraitId[] }; // vertical slice: 1 each
  xp: number;
  flags: Record<string, boolean>;
}

export interface Coach {
  id: string;
  name: string;
  archetype: 'ExPro' | 'Teacher' | 'DrillSergeant';
  xp: number;
  philosophyPoints: number;
  perks: Record<string, boolean>;
  flags: Record<string, boolean>;
}

export interface Team {
  id: string;
  name: string;
  roster: Player[];
  teamChemistry: number; // 0–100
  schedule: Array<{ week: number; opponentId: string }>; 
  standings: { wins: number; draws: number; losses: number; gf: number; ga: number };
  flags: Record<string, boolean>;
}

export interface EventEffect {
  op: 'set' | 'inc' | 'dec' | 'flag';
  target: string; // e.g., 'marco.morale' or 'team.teamChemistry' or 'flag_confronted_marco'
  value?: number | string | boolean;
}

export interface EventDef {
  id: string;
  title: string;
  weight: number; // used when multiple triggers fire
  trigger: { expr?: string }; // safe expression evaluated against StateManager
  effects: EventEffect[];
  inkKnot?: string; // optional knot link
  weekWindow?: { from: number; to: number };
  repeat?: 'never' | 'once-per-season' | 'cooldown';
  cooldownWeeks?: number;
}

export interface SaveGame {
  version: 1;
  stateSnapshot: {
    coach: Coach;
    team: Team;
    opponents: Team[];
    week: number; // current week number
  };
  inkStateJson: string; // story.state.ToJson()
}
```

Constraints and ranges
- Skills: 1–20
- Morale/Fatigue/Chemistry/TeamChemistry: 0–100
- Ensure clamping on all mutations in `StateManager`.


