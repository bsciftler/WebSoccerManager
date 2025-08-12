## Development Setup

### Requirements
- Node.js 18+
- npm 9+

### Narrative Editor (available now)
```bash
cd tools/narrative-editor
npm install
npm run dev
```

### Game (planned M1)
1. Initialize `game/` (Phaser + TypeScript + Vite).
2. Install `inkjs` and basic deps.
3. Copy editor exports and `story.json` into `game/public/`.
4. Run `npm run dev` from `game/`.

### Save/Load
- Saves written to LocalStorage as a single JSON containing `SaveGame` and `inkStateJson`.


