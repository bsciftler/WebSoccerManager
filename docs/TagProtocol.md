## Ink Tag Protocol

Narrative issues commands to the game via Ink tags (`#TAG:params`). The game does not display tags; it parses them after each `continue`.

- `#SOUND:key`
  - Example: `#SOUND:whistle_blow`
  - Action: `SoundManager.play(key)`

- `#STAT:playerId:StatName:+/-N`
  - Example: `#STAT:marco:Work Rate:+1`
  - Action: modifies a specific skill or stat via `StateManager`

- `#MORALE:playerId|team:+/-N`
  - Example: `#MORALE:team:-5` or `#MORALE:leo:+10`
  - Action: clamp 0–100

- `#FLAG:name:set|clear`
  - Example: `#FLAG:flag_confronted_marco:set`
  - Action: sets/clears boolean flags in state

- `#EVENT:name`
  - Example: `#EVENT:show_match_report`
  - Action: dispatches a UI event bus signal

- `#PORTRAIT:characterId:emotion`
  - Example: `#PORTRAIT:leo:angry`
  - Action: updates dialogue UI portrait

Parsing rules
- Multiple tags can appear on the same line; process left-to-right.
- Unknown tags are logged as warnings; they do not break flow.
- All numeric deltas are clamped by the receiving mutation function.


