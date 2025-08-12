## Hundred Items Implementation Plan (1–100)

A concise, actionable checklist spanning foundations, tools, game, content, QA, and release. Numbers continue across sections.

### Foundations & Project Management
1. Define branching strategy and environment naming (dev, preview, prod).
2. Add issue and pull request templates with labels for areas (editor, game, narrative, content, qa).
3. Configure CI pipelines for lint, typecheck, build on every PR.
4. Enable required status checks for `main` and protect branch.
5. Add commit lints (conventional commits) and release notes generator.
6. Stand up the product backlog with epics mapped to milestones M0–M12.
7. Create a risk register with owners and mitigation strategies.
8. Establish a weekly demo cadence and Definition of Done checklist.

### Narrative Editor E1 — Graph + Inspector
9. Install and configure `react-flow` with performant viewport and node memoization. — DONE
10. Implement event/knot node types with badges for weight and week window. — DONE
11. Build selection‑synced side inspector shell (tabs: Trigger, Effects, Meta). — DONE
12. Add `zod` schemas for `EventDef`, `EventEffect`, and `StateVar` definitions. — DONE
13. Implement trigger text editor with basic validation and error surfacing. — DONE
14. Implement effects list with add/remove/reorder and value clamping hints. — DONE
15. Create outliner (Weeks → Beats → Events) synchronized with graph selection. — DONE
16. Implement search/filter across titles, ids, tags, and variables used. — DONE

### Narrative Editor E2 — Trigger Builder + Timeline
17. Build visual trigger builder (AND/OR groups) with nested conditions UI. — DONE
18. Map builder AST to safe expression strings for export. — DONE
19. Add expression test runner panel with mock state and evaluation result. — PARTIAL (generated expression shown; dedicated test‑runner pending)
20. Implement week timeline view with draggable events and weight sliders. — DONE
21. Add “where‑used” references per variable across triggers/effects. — DONE
22. Validate ranges and types against `docs/DataModel.md` constraints. — DONE
23. Create content export v1: `state.json`, `events.json`, `graph.json`. — DONE
24. Add import/merge flow with conflict detection and resolution UI. — TODO

### Narrative Editor E3 — Ink Debugger & Playtest
25. Implement `story.json` loader via drag‑and‑drop and file picker. — DONE
26. Build knot/stitch tree browser with jump‑to and search. — PARTIAL (basic placeholder tree; jump/search pending)
27. Add variable watchlist with live updates from `inkjs`. — PARTIAL (simplified; full `inkjs` sync pending)
28. Implement tag breakpointing (pause when tag matches pattern). — DONE
29. Add state snapshot/save and restore slots for fast iteration. — DONE
30. Build a mini week simulator to run triggers and enqueue events. — DONE
31. Show state diff log after each step (before/after values, clamped flags). — DONE
32. Provide export of test runs as JSON for regression comparisons. — TODO

### Game Core Skeleton
33. Scaffold `game/` with Phaser + TypeScript + Vite.
34. Implement `NarrativeManager` to load and host `inkjs.Story`.
35. Implement `StateManager` with typed getters/setters and clamping.
36. Wire tag parser for `#SOUND`, `#STAT`, `#MORALE`, `#FLAG`, `#EVENT`, `#PORTRAIT`.
37. Create `CoachOffice` scene to render Ink text and present choices.
38. Add simple router to switch scenes (`CoachOffice` → `Roster` → `TacticsBoard`).
39. Integrate hot reload in dev for `story.json` and content bundle.
40. Add global event bus for UI/system events.

### Weekly Loop + AP
41. Implement AP tracker (Mon–Thu) with spend/refund utilities.
42. Create Training action UI with selectable focuses affecting team stats.
43. Create Individual Focus UI (Mentor, Counsel, Discipline) with Ink hooks.
44. Implement Scouting action with location‑based discovery tables.
45. Implement Game Planning action to preview opponent style modifiers.
46. Implement `Roster` scene with sortable list and player details panel.
47. Implement basic `TacticsBoard` with formation selection and drag‑drop.
48. Implement `Weekend` shell with weekly summary placeholders.

### Match Engine v1 + Commentary
49. Implement possession toggle and virtual clock with tick granularity.
50. Define event types with base probabilities and modifiers.
51. Implement skill checks with opposed rolls and trait modifiers.
52. Add stamina/fatigue impact on event outcomes over time.
53. Implement foul/yellow/red card logic influenced by traits.
54. Implement goal, save, shot‑off, turnover outcomes and state updates.
55. Build commentary templating with multiple variants per outcome.
56. Add halftime talk choices with timed buffs/debuffs.
57. Implement limited tactical shouts affecting short windows.
58. Add minimal radar view with positions advancing abstractly.

### UI/UX + Art/Audio v1
59. Apply cohesive theme consistent with high‑school setting.
60. Implement portrait system with emotion swaps and fallback states.
61. Build message/email UI in `CoachOffice` for diegetic updates.
62. Add tooltips and help overlays for AP actions and tactics.
63. Implement responsive layout for desktop/tablet.
64. Wire `#PORTRAIT` and `#SOUND` tag handlers to UI/SFX.
65. Add SFX stubs (clicks, whistle, crowd murmur) and music toggles.
66. Improve readability: typography scale, contrast, spacing.
67. Add settings panel (text size, speed, audio levels, color mode).
68. Implement minimal transitions to guide attention without heavy animation.

### Narrative Integration + Pipeline
69. Define content directory structure and versioning strategy.
70. Implement content loader that validates JSON against `zod` schemas.
71. Add CI job to lint content, check dead references, and ranges.
72. Create baseline trait catalog (positive/negative) with ids and tags.
73. Create opponent templates with style profiles and difficulty bands.
74. Author initial systemic event pool (conflicts, academics, injuries).
75. Build dev command to bundle editor exports into `game/public/`.
76. Document authoring workflow from Inky → editor → game.

### Season Content Production
77. Author season schedule (weeks, rivals, narrative beats).
78. Write 5–6 core character questlines with 3–5 stages each.
79. Author rival arcs with pre‑match/post‑match narrative hooks.
80. Expand event pools with late‑season variants and escalations.
81. Add optional side events (parents, faculty, media).
82. Create commentary expansion packs to reduce repetition.
83. Author failure and comeback paths to support underdog arcs.
84. Validate all flags/variables via automated content checks.

### Systems Depth & Balance
85. Implement Coach Philosophy Tree (Tactician/Motivator/Mentor).
86. Gate special dialogue/options behind perk flags in Ink.
87. Implement recruitment flow and roster churn events.
88. Add opponent AI style weights reacting to player tactics.
89. Add chemistry and morale interplay tuning curves and caps.
90. Build balancing scripts to simulate seasons and collect stats.
91. Integrate telemetry hooks (opt‑in) for key decisions and outcomes.
92. Iterate difficulty settings and ensure fair but challenging range.

### Save/Load, QA, Accessibility, Localization
93. Implement save system (slots, autosave) combining `SaveGame` + Ink state.
94. Add Playwright smoke tests for boot, week loop, match, save/load.
95. Add Vitest units for `StateManager`, triggers, clamping, and tag parsing.
96. Implement keyboard navigation and focus order across scenes.
97. Externalize strings and add basic i18n scaffolding (en base).
98. Add color‑blind‑safe palette and text scaling controls.

### Beta, Release, Post‑Launch
99. Optimize bundle sizes, fix critical bugs, enable error logging and analytics.
100. Deploy web build, publish release notes, and create post‑launch backlog (QoL, content pack #1, editor enhancements).
