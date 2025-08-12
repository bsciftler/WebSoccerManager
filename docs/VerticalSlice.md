## Vertical Slice (Weeks 1–3)

Focus: end-to-end loop with minimal UI, event-based match, and Ink integration.

Scope
- Weeks: 1–3 as outlined (Intro, First Scrimmage + Marco confrontation, Rival setup + Leo grades).
- Scenes: `CoachOffice`, `Roster`, `TacticsBoard`, `MatchView`, `Weekend`.
- Traits: curated set (e.g., Natural Leader, Prodigious Talent, Tireless Engine, Rock Solid, Creative Spark; negatives: Academically Ineligible, Arrogant, Timid, Hot-Headed, Lazy).
- Opponents: 1 rival team with simple stats.

Acceptance Criteria
- Load `story.json` and step narrative; choices render via UI and call back into Ink.
- Tag protocol actions produce visible effects (sound placeholder, portrait swap stub, morale/stat changes).
- Weekly AP actions (Training, Individual Focus, Scouting, Game Planning) modify state and are reflected in Ink variables.
- Match engine simulates 90 minutes with event commentary and result affecting morale/chemistry.
- Save/Load restores exact narrative and game state from LocalStorage.

Deliverables
- Minimal but functional Phaser UI for the five scenes.
- `StateManager` and `NarrativeManager` with typed APIs and clamping.
- `events.json` and `state.json` from editor; sample `graph.json` optional.
- Authored Ink for the three weeks matching the beats.


