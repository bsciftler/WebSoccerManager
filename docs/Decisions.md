## Decisions (ADR-style)

1) Ink as the sole narrative engine
- Decision: Use Ink + `inkjs` exclusively; no Twine/Articy.
- Rationale: Best fit for complex state + native JS runtime.

2) Client-only architecture
- Decision: No backend for prototype; LocalStorage saves.
- Rationale: Reduce complexity, maximize iteration speed.

3) Minimal match engine
- Decision: Event-based, possession toggle, weighted probabilities, text commentary only.
- Rationale: Focus on narrative; avoid physics/animation scope.

4) Limited trait set for slice
- Decision: Curate ~5 positive and ~5 negative traits; 1 of each per player.
- Rationale: Keep balance/design tractable early.

5) Weekly AP system (3 AP/day Mon–Thu)
- Decision: Enforce opportunity cost via AP; actions: Training, Individual Focus, Scouting, Game Planning.
- Rationale: Core strategic tension with low UI complexity.

6) Scenes scope
- Decision: Only `CoachOffice`, `Roster`, `TacticsBoard`, `MatchView`, `Weekend` in slice.
- Rationale: Covers loop end-to-end with minimal surface area.

7) Persistence format
- Decision: `SaveGame` JSON + `inkjs` state string; versioned.
- Rationale: Compact, reliable, engine-agnostic.

8) Validation strategy
- Decision: Schema validation in editor; later add unit tests (Vitest) for event triggers/effects.
- Rationale: Catch data errors early; defer automation breadth.


