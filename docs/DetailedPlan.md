## Web Soccer Manager — 12‑Milestone Delivery Roadmap (Full Game)

This replaces the previous milestone outline with a project‑management oriented roadmap for shipping a full, narrative‑rich season. It aligns with `docs/Architecture.md`, `docs/DataModel.md`, `docs/TagProtocol.md`, `docs/NarrativeEditor.md`, and `docs/VerticalSlice.md`.

### 1) Goals and Scope
- **Primary objective**: Ship a browser‑based, narrative‑first high school soccer management game covering a full season, with robust systems (state, events, match engine), authored narrative (Ink), a production‑ready UI, and a companion narrative/state editor.
- **Outcomes**: Playable end‑to‑end season; reactive narrative with long‑term consequences; save/load; analytics; accessibility; basic localization; post‑launch support plan.

### 2) Technology & References
- **Engine/UI**: Phaser 3 + TypeScript (Vite).
- **Narrative**: Ink → compiled `story.json`, runtime via `inkjs`.
- **State & Data**: Central `StateManager`, typed models per `docs/DataModel.md`.
- **Tag protocol**: See `docs/TagProtocol.md`.
- **Tooling**: ESLint/Prettier, Vitest (unit), Playwright (smoke/e2e), CI.
- **Editor**: React + TS (`tools/narrative-editor`, see `docs/NarrativeEditor.md`).

### 3) Delivery Milestones (12)

Each milestone lists scope, key deliverables, acceptance criteria, and dependencies. Suggested durations assume a solo/small‑team cadence.

### M0. Project Foundations (1–2 weeks)
- **Scope**: Repo governance, CI, quality gates, environments, PM setup.
- **Deliverables**:
  - Repository hygiene: issue/PR templates, labels, branching strategy.
  - CI: typecheck, lint, build for `tools/narrative-editor`; placeholder `game/` CI scaffold.
  - Scripts: `npm` scripts for lint/test/build across workspaces.
  - Planning: product backlog, risk register, roadmap board.
- **Acceptance**:
  - CI runs green on push/PR; conventional commits linted.
  - Docs index updated linking all major specs.
- **Dependencies**: None.

### M1. Narrative Editor E1 — Graph + Inspector (2–3 weeks) — DONE
- **Scope**: Elevate `tools/narrative-editor` to support graph authoring and structured editing.
- **Deliverables**:
  - React Flow graph for events/knots with selection sync to side inspector. — Shipped (`GraphEditor`, `EventNode`, `KnotNode`, `GroupNode`).
  - Inspector for triggers/effects with `zod` validation; outliner and search. — Shipped (`Inspector`, `TriggerTab`, `EffectsTab`, `MetaTab`, `Outliner`, `Search`).
  - Export bundle v1: `state.json`, `events.json`, `graph.json`. — Shipped (`utils/export.ts` + header export button).
- **Acceptance**:
  - Can author an event with trigger/effects, link to Ink knot, export bundle. — Met.
  - Validation blocks undefined variables/targets. — Met (`zod` schemas + UI validation).
- **Dependencies**: M0. See `docs/NarrativeEditor.md` (E1).

### M2. Narrative Editor E2 — Trigger Builder + Timeline (2–3 weeks) — MOSTLY DONE
- **Scope**: No‑code condition composer, week timeline, where‑used.
- **Deliverables**:
  - Visual trigger builder (AND/OR groups), expression generator. — Shipped (`TriggerBuilder` in `TriggerTab`).
  - Timeline view by week with draggable events and weight sliders. — Shipped (`Timeline`).
  - Where‑used references across triggers/effects. — Shipped (`WhereUsed`).
  - Expression test runner panel. — Partial (expression preview present; dedicated test runner pending).
  - Import/merge with conflict resolution. — Pending.
- **Acceptance**:
  - Non‑programmer can define common triggers; timeline exports serialize correctly. — Met (export v1 in M1, timeline done).
- **Dependencies**: M1. See E2 in `docs/NarrativeEditor.md`.

### M3. Narrative Editor E3 — Ink Debugger & Playtest Console (2 weeks) — PARTIAL
- **Scope**: Deeper Ink integration for iteration speed.
- **Deliverables**:
  - Knot/stitch browser, tag breakpointing, variable watchlist, state snapshots. — Tag breakpointing, snapshots, watchlist UI shipped; knot browser placeholder; full `inkjs` variable sync pending.
  - Playtest console to simulate a week, fire triggers, and diff state. — Shipped (`PlaytestConsole`) with history and diffs.
- **Acceptance**:
  - Designer can step through a knot, pause on tags, inspect variables; snapshot/restore works. — Pause on tags and snapshots work; knot navigation and full variable sync pending.
- **Dependencies**: M1–M2.

### M4. Game Core Skeleton (2 weeks)
- **Scope**: Initialize `game/` and core architecture.
- **Deliverables**:
  - Phaser + TS app skeleton; scene routing.
  - `StateManager`, `NarrativeManager` loading `public/story.json`; tag parsing per `docs/TagProtocol.md`.
  - Minimal `CoachOffice` scene rendering Ink text/choices.
- **Acceptance**:
  - Choices advance narrative; tags mutate state; typed APIs per `docs/DataModel.md`.
- **Dependencies**: M0; consumes editor exports.

### M5. Weekly Loop + AP (2 weeks)
- **Scope**: Mon–Thu actions and progression plumbing.
- **Deliverables**:
  - AP actions: Training, Individual Focus, Scouting, Game Planning.
  - Scenes: `Roster`, `TacticsBoard` (basic), `Weekend` shell.
  - EventSystem: weekly sweep using editor `events.json` triggers.
- **Acceptance**:
  - Can complete a full week loop (to Friday) with state deltas reflected in Ink.
- **Dependencies**: M4.

### M6. Match Engine v1 + Commentary (2–3 weeks)
- **Scope**: Event‑based sim with possession toggle and simple radar.
- **Deliverables**:
  - `MatchEngine` with weighted events, skill checks, trait hooks.
  - Commentary strings with trait‑infused variants; halftime talks; limited shouts.
- **Acceptance**:
  - 90‑minute sim produces coherent commentary; results affect morale/chemistry.
- **Dependencies**: M5; references `docs/Architecture.md` match outline.

### M7. UI/UX Pass + Art/Audio v1 (2–3 weeks)
- **Scope**: Ship the five core scenes to production quality.
- **Deliverables**:
  - `CoachOffice`, `Roster`, `TacticsBoard`, `MatchView`, `Weekend` UI polish.
  - Portrait system with emotions; basic SFX and music stubs; theme styling.
- **Acceptance**:
  - UX coherent and themed; tags `#PORTRAIT`/`#SOUND` visibly work.
- **Dependencies**: M4–M6.

### M8. Narrative Integration + Content Pipeline (3–4 weeks)
- **Scope**: Robust data path and authoring cadence.
- **Deliverables**:
  - Build step to ingest editor exports; schema checks; versioned content.
  - Author baseline trait set; opponent templates; initial event library.
  - Tooling for content iterators (lint, dead‑link checks, where‑used).
- **Acceptance**:
  - CI validates content on PR; game hot‑reloads content in dev.
- **Dependencies**: M1–M3, M4–M7.

### M9. Season Content Production (4–6 weeks)
- **Scope**: Full season arcs, rivalries, and systemic pools.
- **Deliverables**:
  - Complete season schedule; 5–6 core character questlines; rival arcs.
  - Systemic events (injuries, academics, conflicts) with gating flags.
- **Acceptance**:
  - End‑to‑end season playable; choices ripple into late‑season content.
- **Dependencies**: M8.

### M10. Systems Depth & Balance (3–4 weeks)
- **Scope**: RPG layer and recruitment depth.
- **Deliverables**:
  - Coach Philosophy Tree with perks affecting gates and modifiers.
  - Recruitment/scouting flow and roster churn; opponent style profiles.
  - Difficulty/balance passes; telemetry hooks.
- **Acceptance**:
  - Distinct playstyles (Tactician/Motivator/Mentor) change options and outcomes; balanced win/loss rates.
- **Dependencies**: M5–M9.

### M11. Save/Load, QA, Accessibility, Localization (3 weeks)
- **Scope**: Ship‑ready foundations.
- **Deliverables**:
  - LocalStorage save/load of `SaveGame` + `inkjs` state; save slots.
  - Test suite: Vitest units for state/events; Playwright smoke for core flows.
  - Accessibility: keyboard nav, readable contrast, scalable text; basic L10n scaffolding.
- **Acceptance**:
  - Reload resumes exact state; tests green in CI; a11y checks pass; strings externalized for future L10n.
- **Dependencies**: M4–M10.

### M12. Beta, Polish, Release, Post‑Launch (2–3 weeks)
- **Scope**: Finalization and deployment.
- **Deliverables**:
  - Performance tuning, bug triage, UX nits; narrative proofreading pass.
  - Web deployment (static host); analytics dashboards; crash/error logging.
  - Post‑launch backlog (QoL, content pack 1, editor improvements).
- **Acceptance**:
  - Public beta build; release candidate meets quality bar; docs updated.
- **Dependencies**: All prior milestones.

### 4) Cross‑Cutting Management
- **Definition of Done**: code reviewed, typed, lint‑clean, tests passing, content validated, docs updated.
- **Risk controls**: scope gates on animation; strict ownership of State Catalogue; CI content validation.
- **PM cadence**: milestone kickoffs, weekly demos, burndown, risk reviews.

### 5) References
- Architecture: `docs/Architecture.md`
- Data model: `docs/DataModel.md`
- Tag protocol: `docs/TagProtocol.md`
- Narrative editor: `docs/NarrativeEditor.md`
- Vertical slice expectations: `docs/VerticalSlice.md`
