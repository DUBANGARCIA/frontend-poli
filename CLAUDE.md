# Frontend Poli — Development Policies

## Stack

- **Framework**: Angular 21 (CLI-generated)
- **Language**: TypeScript (strict mode)
- **Runtime**: Bun (managed via mise)
- **Styling**: CSS
- **Deployment**: Vercel

## Setup

```bash
mise install         # Install pinned tool versions (bun, node, lefthook, taplo, trivy)
mise run setup       # Full setup: install tools, hooks, and dependencies
```

`mise run setup` chains `mise trust`, `mise install --yes`, `bun install`, and installs lefthook hooks via the `postinstall` mise hook.

## Branching Model

- `main` — production
- `develop` — integration
- `feature/*` — new work, branched from `develop`
- `release/*` — release prep, branched from `develop`
- `hotfix/*` — urgent fixes, branched from `main`

Never push directly to `main` or `develop`. All changes go through PRs.

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/). Validated by commitlint via lefthook `commit-msg` hook. Use `bunx czg` for the interactive commit wizard.

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## Code Quality

Pre-commit hooks (via lefthook):

- `prettier` — formats `.json`, `.md`, `.yaml`
- `eslint` — lints `.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`
- `taplo` — formats `.toml`

Pre-push:

- `bun run build` must succeed

## Package Management

- Use `bun` exclusively — no `npm`, `yarn`, or `pnpm`
- `bun.lock` is the single lockfile
- `pnpm-lock.yaml` and `pnpm-workspace.yaml` have been removed

## CI

- **Lint + Security** (`.github/workflows/lint-security.yaml`): bun install --frozen-lockfile, prettier --check, eslint, trivy CRITICAL/HIGH
- **Vercel**: Preview deployment (may fail on config issues unrelated to code changes — track separately)

## Security Scanning

Trivy is pinned in `mise.toml`. Run locally before pushing:

```bash
mise exec -- trivy fs --severity CRITICAL,HIGH .
```

CI breaks on any CRITICAL or HIGH CVE found in dependencies or configuration files.

## Rules

- Keep commits atomic — one logical change per commit
- Every commit must lint clean (`bun lint`) and build clean (`bun run build`)
- Do not install tools outside of mise when a mise registry entry exists
- All YAML files use `.yaml` (not `.yml`) per BRA-8 policy
