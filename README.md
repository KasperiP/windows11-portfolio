# Windows11-portfolio

[![Open in Visual Studio Code](https://img.shields.io/badge/Open%20In%20Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://open.vscode.dev/KasperiP/windows11-portfolio)

Windows 11 inspired personal portfolio website built using Next.js & deployed on Vercel.

![windows11-banner](https://i.imgur.com/muQyeAG.png)

## Demo

View the website on Vercel: https://www.kassq.dev

## Getting Started

Requires Node 20.9+ (see `.nvmrc`) and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.local.example` to `.env.local` for the Cloudinary and Spotify
credentials. Without them the Pictures, Videos and Projects folders render as
empty instead of failing the build.

## Scripts

| Command                               | Description                 |
| ------------------------------------- | --------------------------- |
| `pnpm dev`                            | Development server          |
| `pnpm build` / `pnpm start`           | Production build and server |
| `pnpm typecheck`                      | `tsc --noEmit`              |
| `pnpm lint` / `pnpm lint:fix`         | ESLint                      |
| `pnpm lint:css` / `pnpm lint:css:fix` | Stylelint                   |
| `pnpm format` / `pnpm format:check`   | Prettier                    |

## Stack

Next.js 16 (Pages Router, Turbopack), React 19, TypeScript 6, CSS Modules,
[motion](https://motion.dev) for animation, and `react-rnd` + `react-selecto`
for the window manager. Deployed on Vercel.
