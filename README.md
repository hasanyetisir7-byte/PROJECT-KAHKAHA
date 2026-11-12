# PROJECT KAHKAHA — Online multiplayer prototype

## Included
- Third-person 3D arena
- Goofy rounded characters
- WASD movement, mouse camera, jump, sprint
- Slap/knockback mechanic
- Socket.IO multiplayer server (up to 10 concurrent players)
- Player join/leave and position sync

## Run locally
1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000` in your browser.

For friends on the internet, deploy this Node app to Render as a Web Service:
- Build command: `npm install`
- Start command: `npm start`
- Runtime: Node
- No environment variables are required for this prototype.
Then share the Render URL with friends.

## Controls
- WASD: move
- Mouse: camera
- Space: jump
- Shift: run
- Left mouse or F: slap nearby player
- ESC: release mouse

## Important prototype notes
This is an early multiplayer prototype, not a finished commercial game. It currently uses a shared arena and relays player positions through Socket.IO. Physics/knockback are client-side approximations, so it is not cheat-resistant or fully synchronized yet. The next iteration should add server-authoritative physics, room codes, reconnect handling, mobile controls, proper ragdoll joints, sound, and additional mini-game modes.