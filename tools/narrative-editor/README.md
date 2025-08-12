# Narrative & State Editor

A small web tool to author and playtest state-driven narrative for Friday Night Underdogs.

## Requirements
- Node.js 18+ and npm 9+ (or pnpm/yarn). On macOS with Homebrew:
  - Install Node: `brew install node`

## Install & Run
```
npm install
npm run dev
```
Open the printed local URL.

## Build & Preview
```
npm run build
npm run preview
```

## Tabs
- State Catalogue: define variables/flags and export JSON.
- Event Editor: define systemic events with trigger expressions and effects.
- Ink Playtest: drag-drop compiled `story.json` (from Inky), click Continue, choose options, and inspect emitted tags.


