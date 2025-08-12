## Narrative Editor Workflow

Goal: design variables/events and playtest Ink quickly.

Prereqs
- Node 18+
- Inky to compile `.ink` → `story.json`

Run the editor
```bash
cd tools/narrative-editor
npm install
npm run dev
```

Workflow
1. Create variables in State Catalogue (type, scope, initial, constraints).
2. Author events with triggers and effects; link to Ink knots when applicable.
3. Drag/drop compiled `story.json` into the Ink Playtest tab.
4. Step through narrative; watch tags and variables; set breakpoints if needed.
5. Export bundle: `state.json`, `events.json`, `graph.json` (and copy `story.json`).
6. Place artifacts into `game/public/` for the Phaser app.

Validation
- Built-in schema checks (zod). Conflicts panel flags undefined variables, dead ends, missing knots.

