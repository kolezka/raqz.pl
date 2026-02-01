# Claude Code Instructions

## Package Manager

Always use **bun** instead of npm for all package management and script execution:

- `bun install` instead of `npm install`
- `bun run dev` instead of `npm run dev`
- `bun run build` instead of `npm run build`
- `bun run lint` instead of `npm run lint`
- `bun run format` instead of `npm run format`

## Code Quality

Before pushing code, ensure:
1. Code is formatted with Prettier (`bun run format`)
2. No ESLint errors (`bun run lint`)
3. TypeScript compiles without errors (`bun run type-check`)

## Git Workflow

Use conventional commits format for all commit messages.
