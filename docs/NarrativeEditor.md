## Narrative & State Editor — Product and Technical Design

### Overview
An intuitive, writer-friendly web editor to author the state-driven narrative of Friday Night Underdogs. It combines a drag-and-drop graph for event flow, a tree outliner mapped to the season structure, powerful state/flag tooling, and an integrated Ink playtest/debugger using `inkjs`.

### Objectives
- Lower the barrier for designing complex, stateful narrative without raw code.
- Prevent “narrative clashes” by making state dependencies visible, validated, and searchable.
- Provide a tight loop: design → simulate → verify tags/state → iterate.

### Core Concepts
- **State Catalogue**: Single source for variables, flags, lists. Every variable includes type, scope, initial value, constraints, and references (“where used”).
- **Events**: Systemic definitions with triggers and effects that can optionally link to an Ink knot/stitch. Events are visualized as nodes in a graph and as items in the season outliner.
- **Tag Protocol**: Writers use Ink tags to command the game; the editor includes a protocol test panel to simulate tags.

### UX Feature Set
1) Graph Editor (React Flow)
- Nodes: Event nodes (systemic), Knot nodes (references to `story.json`), Group nodes (weeks/arcs), and “Gateway” nodes (conditional split/merge).
- Edges: Visualize potential progression or gating; annotate with conditions/weights.
- Interactions: Drag to move; double-click to open Inspector; rubber-band selection; copy/paste; align/snap; color labels for archetypes/traits.

2) Tree Outliner
- Structure: Season → Week → Beat → Event.
- Drag to reorder within a week; right-click to add new Event or link to existing Ink knot; shows active triggers and unresolved references.

3) Inspector Panels
- Event Inspector: id, title, weight, trigger builder (no-code), effects (set/inc/dec/flag), link to Ink knot/stitch; validation and previews.
- Variable Inspector: type/scope/initial, min/max or enum, description, references, and quick actions (rename with ref update, deprecate, lock).
- Edge Inspector: gating condition or weight modifier; can set “week window” and repeat policies.

4) Trigger Builder
- No-code UI: pick variable → comparator → value; nest with AND/OR/NOT groups; emit safe AST and a human-readable summary. Advanced tab allows expression editing with validation.

5) Timeline View
- Horizontal week strip displaying planned beats (scripted) vs. systemic pools; shows weights and conflicts. Clicking a week filters graph/outliner.

6) Ink Integration & Debugger
- Load compiled `story.json` (drag/drop). Browse knots/stitches. Bind events to knots with autocomplete. Step through Ink with a console that shows output, choices, current tags, and a watchlist for variables.
- Breakpoints: pause on tag match (e.g., `#MORALE`), on entering a knot/stitch, or when a watched variable changes.
- Snapshots: save/restore Ink state blobs; export playtest transcripts.

7) Validation & QA
- Schema validation with `zod`. “Where-used” graph for variables/flags. Conflicts panel for undefined variables, dead-end nodes, unreachable events, contradictory gates, or missing knots.

### Data Model (Schemas)
- Variable
```
{
  id: string,
  name: string,
  type: 'int' | 'float' | 'bool' | 'string' | 'enum',
  scope: 'global' | 'team' | 'player' | 'coach',
  initial: number | boolean | string,
  constraints?: { min?: number, max?: number, values?: string[] },
  description?: string
}
```
- Event
```
{
  id: string,
  title: string,
  weight: number,
  trigger: { ast?: TriggerAst, expr?: string },
  effects: Array<{ op: 'set'|'inc'|'dec'|'flag', target: string, value?: number|string|boolean }>,
  inkKnot?: string,
  weekWindow?: { from: number, to: number },
  repeat?: 'never'|'once-per-season'|'cooldown',
  cooldownWeeks?: number
}
```
- Graph Meta
```
{
  nodes: Array<{ id: string, type: 'event'|'knot'|'group'|'gateway', position: {x:number,y:number}, data: {...} }>,
  edges: Array<{ id: string, source: string, target: string, label?: string, conditionExpr?: string, weightMod?: number }>
}
```
- Project Bundle
```
{
  version: 1,
  state: { variables: Variable[] },
  events: { events: Event[] },
  graph: GraphMeta,
  editor: { outliner: ..., timelines: ... }
}
```

### Tech Stack
- React + TypeScript + Vite
- `react-flow` for node graph
- `zod` for validation, `monaco-editor` or `@uiw/react-codemirror` for advanced editing
- `inkjs` for runtime playtest
- `localforage` for autosave; optional file-based export/import

### MVP → Advanced Roadmap
- MVP: Outliner, basic Graph with Event nodes, Inspector (id/title/trigger/effects), Ink loader + stepper + tags, export bundle v1.
- Iteration 1: Trigger Builder, where-used, schema validation, week timeline.
- Iteration 2: Ink debugger (breakpoints, snapshots), protocol test panel, variable watch.
- Iteration 3: Collaboration hooks (conflict-aware JSON merge), presets/templates for trait chains, and lockable variables/flags.

### Integration with Game
- CI step bundles editor output (`state.json`, `events.json`, `graph.json`) and copies compiled `story.json` from Inky into `game/public/`. The game’s `NarrativeManager` consumes tags; `StateManager` loads initial variables and applies events.

### Acceptance Criteria (Editor)
- Create variable, use in trigger, validate, export bundle → no errors.
- Build event chain visually; link to Ink knot; step playtest; see tags and state changes.
- Timeline shows Week 1–3 beats as in GDD; warnings for unreachable/dead ends.


