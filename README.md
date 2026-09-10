# LoL SkinAnalyst

This App will give you detailed Information about your League Of Legends Skin Inventory.

![Screenshot](https://raw.githubusercontent.com/CubE135/lolskinanalyst/master/src/assets/img/screenshot.png)

## Installation

Just download the windows installer and run it. This will install the App and all it's dependencies.

Currently, i only offer a windows installer. If you want to install this App on a device using a different operating system, please contact me or make an issue in this repository.

## Features

**Counter**
- Count owned and not owned Champions
- Count owned and not owned Skins
- Count all owned Skin Shards

**Champion List**
- Lists all Champions
- Filter Champion list by owned, not owned, owned Skins, not owned Skins or owned Skin Shards
- Use these filters to for example see what Champions you don't have skins for but you have Skin Shards for.
- Show all owned Skins for a Champion
- Show all not owned Skins for a Champion
- Show all owned Skin Shards for a Champion

## Development

Want to work on the app locally? Here's what you need.

**Prerequisites**
- [Node.js](https://nodejs.org/) (LTS)
- [Bun](https://bun.sh/) — the project is developed against Bun, though `npm install`/`npm run <script>` work too since it's a standard package.json setup
- League of Legends installed, if you want to test anything that talks to the League Client (LCU API) — features like fetching your champions/skins/loot only work while `LeagueClientUx.exe` is actually running

**Setup**
```
git clone https://github.com/CubE135/lolskinanalyst.git
cd lolskinanalyst
bun install
```

**Scripts**
- `bun run start` — launches the app in dev mode via Electron Forge + Vite
- `bun run lint` — runs ESLint over the TypeScript source
- `bun run package` — bundles the app into a runnable folder under `out/` (no installer), useful for a quick smoke test
- `bun run make` — packages the app and builds distributables into `out/make/` (Windows Squirrel installer, `.deb`, `.rpm`, macOS `.zip`)
  - Note: the Windows Squirrel installer runs and installs silently (no install wizard) and launches the app automatically when finished — that's expected Squirrel behavior, not a bug

## Contributing

Contributions are welcome!

1. Fork the repository and create a branch for your change.
2. Make your changes, keeping to the existing TypeScript/ESLint code style.
3. Run `bun run lint` and fix anything it flags.
4. Open a Pull Request describing what you changed and why.

For anything bigger than a small fix, please open an issue first so we can discuss the approach before you put the work in.

## License
[MIT](https://choosealicense.com/licenses/mit/)
