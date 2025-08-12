## Friday Night Underdogs — Detailed Implementation Plan

### 1) Goals and Scope
- **Primary goal**: Build a browser-based, narrative-first high school soccer management game where systems are driven by a central narrative state machine.
- **Near-term deliverables**: (a) Working vertical slice for first 2–3 weeks (Week 1–3) including training, AP spending, first scrimmage, and the Marco confrontation; (b) A separate web-based Narrative/State Editor to author variables, flags, and events, and to playtest compiled Ink stories via `inkjs`.

### 2) Technical Stack
- **Engine/UI**: Phaser 3 + TypeScript (Vite bundler)
- **Narrative**: Ink (authored in Inky), runtime via `inkjs` in the game. Authoring support via the separate web editor.
- **State**: Central `StateManager` (TypeScript) as single source of truth; narrative reads/writes state via `NarrativeManager` API.
- **Storage**: LocalStorage for saves during prototyping; plan for exportable/importable JSON saves.
- **Tooling**: ESLint + Prettier, Vitest for unit tests (later), Playwright for UI smoke tests (later).

### 3) Architecture Overview
- **Core modules**:
  - `StateManager`: Initializes, stores, and mutates all game state (team, players, coach, flags, week schedule, AP, etc.). Provides clean, typed methods (e.g., `modifyMorale`, `setFlag`, `spendAp`, `applyMatchResult`).
  - `NarrativeManager` (inkjs): Loads compiled `story.json`, exposes `continueStory`, `getChoices`, `makeChoice`, `getVariable`, `setVariable`, `observeVariable`. Parses story tags (e.g., `#MORALE`, `#STAT`, `#EVENT`) and dispatches to `StateManager`/UI.
  - `EventSystem`: Weekly trigger sweep that pulls candidate events from the narrative or a system-driven pool (traits, performance, coach actions). For authored narrative, events are primarily Ink knots; for systemic beats, use code-side weighted tables.
  - `MatchEngine`: Event-based simulator with possession toggle and weighted probabilities. Consumes `StateManager` data (skills, chemistry, fatigue), returns log and outcomes for commentary/UI. Commentary strings include hooks for trait-infused flavor.
  - `UI Scenes` (Phaser): `CoachOffice`, `Roster`, `TacticsBoard`, `MatchView`, `Weekend` (report/progression). Each scene interacts only with `NarrativeManager` and `StateManager` APIs.

### 4) Data Model (TypeScript)
- `Player`: id, name, portraitKey, position, skills {technical, mental, physical}, morale (0–100), fatigue (0–100), chemistry (hidden), traits {positive[], negative[]}, xp, flags {}.
- `Coach`: id, name, archetype, xp, philosophyPoints, perks {}, flags {}.
- `Team`: roster[], teamChemistry (0–100), schedule[], standings, flags {}.
- `Event` (systemic): id, triggers (predicate DSL or function), weight, effects (state mutations), optional link to Ink knot.
- `SaveGame`: state snapshot + ink state JSON string (`story.state.ToJson()`).

### 5) File/Project Structure
```
WebSoccerManager/
  game/                  # (to be added when coding begins)
  tools/
    narrative-editor/    # web-based state/narrative editor (created now)
  DetailedPlan.md        # this plan
  High School Soccer Management Game_.md
  Suzerain-like Game Development Tools_.md
```

Planned `game/` structure when implementation starts:
```
game/
  package.json
  vite.config.ts
  tsconfig.json
  public/
    assets/
    story.json           # compiled Ink story (from Inky)
  src/
    core/StateManager.ts
    core/NarrativeManager.ts
    core/MatchEngine/
      MatchEngine.ts
      commentary.ts
    scenes/
      CoachOffice.ts
      Roster.ts
      TacticsBoard.ts
      MatchView.ts
      Weekend.ts
    ui/
      components/...
    index.ts
```

### 6) Tag Protocol (Ink → Engine)
- `#SOUND:key` → SoundManager.play(key)
- `#STAT:playerId:StatName:+/-N` → StateManager.modifyPlayerStat
- `#MORALE:playerId|team:+/-N` → StateManager.modifyMorale
- `#FLAG:name:set|clear` → StateManager.setFlag
- `#EVENT:name` → Global UI event bus dispatch
- `#PORTRAIT:characterId:emotion` → Dialogue UI portrait change

### 7) Milestones and Acceptance Criteria
- **M0 — Tooling & Plan (this sprint)**
  - Deliver `DetailedPlan.md` and scaffold `tools/narrative-editor` with tabs: State Catalogue, Event Editor, Ink Playtest (upload `story.json`, step, choose).
  - Acceptance: Editor runs via `npm run dev`; can add variables/flags and author event JSON; can load a sample `story.json` and step through.

- **M1 — Core Skeleton (Game Project)**
  - Initialize `game/` Phaser + TS app; implement `StateManager`, `NarrativeManager` (loading `story.json`), and a simple `CoachOffice` scene with AP display and a “Continue” that advances an Ink knot.
  - Acceptance: App runs; state variables sync with Ink; tags alter state/UI.

- **M2 — Weekly Loop (Prototype 2)**
  - Implement AP actions (Training, Individual Focus, Scouting, Game Planning) as simple buttons altering state and calling Ink hooks. Add `Roster` and `TacticsBoard` UIs (basic forms/drag-drop placeholder).
  - Acceptance: Can complete Mon–Thu loop, reach Friday.

- **M3 — Match Engine (Prototype 1)**
  - Implement event-based match sim (possession toggle, weighted events, skill checks, trait hooks). Output text commentary and simple radar dots.
  - Acceptance: Full 90-minute simulated flow with halftime talk and limited shouts.

- **M4 — Weekend + Progression**
  - Add Match Report, XP gains, level ups, philosophy points, and basic tree with 1–2 perks per branch that unlock narrative options.
  - Acceptance: Win/loss affects morale/chemistry; perks unlock options in Ink.

- **M5 — Vertical Slice (Weeks 1–3)**
  - Author Ink for Week 1 intro, Week 2 scrimmage + Marco confrontation, Week 3 rival setup and Leo grades event. Integrate portraits and a few SFX tags.
  - Acceptance: Playable end-to-end 3-week slice with meaningful choices affecting later scenes.

- **M6 — Hardening & Save/Load**
  - Local save/load using `inkjs` JSON + game-state JSON. Add basic analytics logging for narrative QA.
  - Acceptance: Reload resumes exact narrative/game state.

### 8) Narrative/State Editor (tools/narrative-editor)
- **Purpose**: A full-featured, intuitive GUI to author the narrative state machine, events, and their links to Ink content. Designed for writers and designers, with drag-and-drop graph editing, a tree outliner, and integrated playtesting via `inkjs`.
- **Core UX** (planned and aligned with the GDD/tools doc):
  - **Graph Editor (Drag-and-Drop)**: Visual node editor (React Flow) for Events and Flow. Nodes represent Event definitions (systemic) and/or references to Ink knots/stitches; edges represent potential progression/gating. Supports grouping, color-coding, weights, and quick-duplication templates for common patterns (e.g., “Trait -> Conflict -> Resolution”).
  - **Tree Outliner**: Hierarchical view of Weeks → Key Beats → Events (matches Table 6.1 in the GDD). Drag to reorder within a week; link outliner items to graph selection.
  - **State Catalogue with Inspector**: Grid + form inspector for variables, flags, and lists, including “where-used” references (events/conditions that touch a variable) and validation (ranges, types).
  - **Trigger Builder**: No-code condition composer (dropdowns, comparators, AND/OR groups) that emits a safe expression or AST; advanced mode supports raw expressions.
  - **Effects Panel**: Side inspector to define state mutations (inc/dec/set/flag) with previews and constraints.
  - **Timeline**: Week-by-week timeline strip to visualize scripted beats vs. systemic pools and their weights.
  - **Ink Integration**: Load compiled `story.json`, browse knots/stitches in a mini tree, bind events to knots, step through with variable watchlist, inspect tags, set breakpoints on tags/knots, and snapshot/restore story state.
  - **Playtest Console**: Embedded runner to simulate a week, fire triggered events, step Ink, and view a state diff log.
  - **Export/Import**: Project bundle exports (state.json, events.json, editor meta) and merge assistant to combine with `story.json` at build time for the game.
- **Tech choices**:
  - React + TypeScript + Vite; `react-flow` for the graph; `zod` for schema validation; `expr-eval` (or similar) for trigger parsing; `localforage` for autosave; CodeMirror/Monaco for advanced JSON editing.
- A complete design is detailed in `NarrativeEditor.md` (added).

### 9) Risks and Mitigations
- Ink compilation is not available in-browser: write in Inky, compile to `story.json`, load into game/editor. Mitigation: document hot-reload workflow and add a file-drop playtest.
- Narrative complexity causing “clashes”: enforce State Catalogue ownership in `StateManager`; review gates/flags in PRs; automated narrative tests later.
- Scope creep in match engine: keep to weighted events + dice rolls; avoid animation-heavy work until vertical slice complete.
 - Editor complexity: ship iteratively—start with graph + inspector MVP, add trigger builder and timeline in the next iteration; lock schemas early and version them.

### 10) Narrative Editor Roadmap (E-series)
- **E0 — MVP (shipped)**: Tabs, basic State Catalogue, basic Event JSON editor, Ink file loader + stepper + tags.
- **E1 — Graph + Inspector**: React Flow node editor for events; side inspector for triggers/effects; outliner + search; export bundle v1.
- **E2 — Trigger Builder + Timeline**: No-code condition builder, expression validator, week timeline view, “where-used,” JSON schema validation.
- **E3 — Ink Debugger**: Knot/stitch browser, breakpoints on tags, variable watch, state snapshots; tag protocol test panel.

### 11) Definition of Done (Vertical Slice)
- Core loop (Mon–Sun) works; match sim produces coherent commentary; 3 weeks authored in Ink; choices carry forward via flags; save/load functional; narrative editor supports state catalogue, events JSON, and Ink playtest.


