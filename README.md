# Study Zone React

A React + TypeScript + Vite browser extension popup for managing a focused study zone.

This project is built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Manifest V3 browser extension support

## What it does

The Study Zone extension lets users add allowed websites to a black list. When the extension is enabled, unlisted websites remain accessible.

## Project structure

- `manifest.json` — extension metadata and permissions
- `index.html` — popup entry point
- `src/Pages/App.tsx` — main UI for the extension popup
- `src/background.ts` — background service worker logic
- `src/Map.ts` — storage and website list helpers
- `src/Components/WebCard.tsx` — website card UI component
- `public/` — static assets

## Setup (for code editing)

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Extension testing

After building, load the unpacked extension from the `dist/` folder in your browser's extension developer mode.

## Notes

- The extension uses `manifest_version: 3`.
- The popup is served from `index.html`.
- The compiled background worker is `background.js` after build.
- Website state is managed through the helper code in `src/Map.ts`.

## License

This repository does not include a license file. Use it under your own terms.
