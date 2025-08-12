## Architecture

**Guiding principle**: Keep technology simple, concentrate complexity in narrative/state.

- **Client-only web app** (no server). Saves via LocalStorage.
- **Tech**: Phaser 3 + TypeScript + Vite for the game; React + TypeScript + Vite for the narrative editor. Ink runtime via `inkjs` in both.

### High-level Modules
- `StateManager`: single source of truth for game state and mutations.
- `NarrativeManager` (inkjs): loads `story.json`, advances, exposes choices, reads/writes variables, parses tags.
- `EventSystem`: weekly trigger sweep over authored/systemic events; applies effects.
- `MatchEngine`: simple event-based sim with possession toggle and weighted outcomes; produces commentary.
- `UI Scenes` (Phaser): `CoachOffice`, `Roster`, `TacticsBoard`, `MatchView`, `Weekend`.

### Repository Layout
```text
WebSoccerManager/
  docs/
  tools/
    narrative-editor/
  game/                 # to be added at M1
```

### Planned Game Structure
```text
game/
  package.json
  vite.config.ts
  tsconfig.json
  public/
    assets/
    story.json
  src/
    core/
      StateManager.ts
      NarrativeManager.ts
      MatchEngine/ (MatchEngine.ts, commentary.ts)
    scenes/ (CoachOffice.ts, Roster.ts, TacticsBoard.ts, MatchView.ts, Weekend.ts)
    ui/components/
    index.ts
```

### Integration Flow (Editor → Game)
- Write Ink in Inky → compile to `story.json`.
- Use editor to author `state.json`, `events.json`, `graph.json`.
- Copy artifacts to `game/public/` (CI or manual) → game reads on launch.

### Persistence
- Prototype: LocalStorage storing `SaveGame` (game state JSON + `inkjs` `story.state.ToJson()` string).

### Non-goals (to reduce tech complexity)
- No backend, accounts, or multiplayer.
- No heavy animations/3D; minimal visuals beyond UI and light VFX.
- No asset pipeline beyond static web assets.


