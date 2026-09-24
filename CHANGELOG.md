# Changelog

## 5.1.0

- Update basro's Haxball Headless engine to build `1a5c4da7` (PR #155).
- Expose each player's current button state through `PlayerObject.input`.
- Add `RoomObject.onPlayerInput(player, prevInput)` for input changes. Read the
  new state from `player.input` and the previous state from `prevInput`.
- Add typings for `RoomObject.InputBits` and export the `InputFlags` and
  `InputBitsObject` types. The runtime flags are Up (1), Down (2), Left (4),
  Right (8), and Kick (16).

TypeScript code that constructs its own `PlayerObject` fixtures must now supply
`input` (use `0` for no buttons pressed). `PlayerJoinObject` inherits this field.
