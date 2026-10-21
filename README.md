# Southside Automation

Original ChatGPT Sites landing page for practical workflow automation in Southside Virginia. This repository contains the maintainable React/TypeScript source, CSS, SVG favicon/assets, form endpoint, D1 schema and migration, locked dependencies, and vendored Sites build integration with its license.

## Source and current deployment

- Current Sites URL: https://southside-automation.jtwray.chatgpt.site
- Sites project: `appgprj_6ab7c88deab88191802098dbc755394f`
- Imported from the original checkout at source commit `25809a8d5f0736b71f7c17b59753a61bd10d1d0a`, matching saved Sites version 1.
- This migration does not redeploy Sites, move its database, change access settings, or configure DNS/Netlify. GitHub pushes do not automatically publish to Sites.

The application uses Vinext (a Vite implementation of the Next.js APIs), React, Tailwind CSS, and Cloudflare Workers/D1. It is a server application, not a static HTML export or a standard `next build` project. Keep the `sites()` integration in `vite.config.ts` and `.openai/hosting.json`; the latter declares the `DB` binding and existing project identity. Publishing through the authenticated Sites workflow injects the production binding and applies the checked-in migrations. The all-zero local database ID is a placeholder, not a production resource or credential.

## Fresh-clone setup

Use Node.js 22.13 or newer and **pnpm 11.25.0**, as pinned in `package.json`. Install that exact pnpm version through your package-manager tooling (for example, `npm install --global pnpm@11.25.0`). Bash and GNU `timeout` are needed only for the retained managed Sites installer/build helpers; ordinary clones select the portable profile automatically. On Windows, use the direct pnpm commands below.

```sh
git clone https://github.com/jtwray/Southside-Automations-website.git
cd Southside-Automations-website
pnpm install --frozen-lockfile
pnpm run db:migrate:local
pnpm run dev
```

Open http://localhost:5173. Wrangler/Miniflare runs D1 locally without a Cloudflare account or production credentials. Database state lives under ignored `.wrangler/state`. Development and built-server testing share this location; stop a running server before applying migrations. `wrangler.local.json` is for local database commands only; never deploy it or use `--remote` with it.

```sh
pnpm run build
pnpm run start
```

`start` serves the built Worker from `dist/server/wrangler.json` (normally http://127.0.0.1:8787; use the URL printed by Wrangler). `dist/client` alone cannot run the form. No application secrets or environment variables are required locally. Registry access is needed on a new machine to install dependencies; do not use `npm ci`, because this project has a pnpm lockfile and no npm lockfile.

The existing `scripts/` support both portable clones and the managed Sites environment. `.sites-runtime/execution-profile.json` is machine-local and intentionally excluded. Sites may provision that profile using its own helper; external contributors need no Sites plugin to install, develop, or build.

## Form and lead data

`app/audit-form.tsx` posts JSON to the same-origin `POST /api/inquiries` endpoint in `app/api/inquiries/route.ts`. The endpoint trims and bounds fields, requires name/business/valid email/a workflow description of at least 10 characters, and handles a hidden `website` honeypot. It uses a parameterized D1 insert and returns 201 on success, 400 for invalid input, 413 when the declared content length exceeds 12,000 bytes, and 503 when storage is unavailable. The honeypot returns a success response without inserting a row. It is basic spam handling, not a complete abuse-prevention system.

`db/schema.ts` and `drizzle/0000_narrow_maestro.sql` define `inquiries`: id, created_at (Unix milliseconds), name, business, email, optional phone, workflow, optional software, and status (initially `new`). Drizzle metadata is retained for future migrations. After intentional schema changes run `pnpm run db:generate`, review the generated SQL, then apply local migrations.

Inspect only the local test database with:

```sh
pnpm run db:inspect:local -- --command "SELECT id, business, status FROM inquiries;"
```

Production submissions remain in the existing Sites D1 database and can be reviewed through Sites database tools. **There are no email notifications, automatic replies, admin dashboard, or lead-export workflow implemented.** The form's promise of a follow-up requires manual lead review. This source migration does not copy any submitted lead data.

## Source map

- `app/page.tsx`, `app/globals.css`, `app/layout.tsx`: landing page, styling, metadata.
- `app/audit-form.tsx`, `app/api/inquiries/route.ts`: client form and server handler.
- `db/`, `drizzle/`, `drizzle.config.ts`: database access, schema, migration history.
- `public/`: favicon and assets.
- `build/`, `scripts/`, `vite.config.ts`, `.openai/hosting.json`: Sites/Workers build support.
- `components/`, `hooks/`, `lib/`, `vendor/`, `examples/`: retained starter source and licenses; examples are not active application routes.

Do not commit dependency trees, built output, local databases, release archives, credentials, or `.env`/`.dev.vars` files. The pinned lockfile and pnpm workspace install policy are part of the reproducible setup.

## Netlify deployment

`netlify.toml` overrides the UI build command with `pnpm run build:netlify` and publishes `.next`. This runs standard Next.js with webpack, producing the output required by Netlify's Next.js runtime. Keep the existing `@netlify/plugin-nextjs` runtime enabled. `pnpm run build`, `dev`, and `start` retain the original Sites/Workers workflow.

The Netlify build sets the public, non-secret `NEXT_PUBLIC_INQUIRY_BACKEND=netlify` switch. The browser then submits URL-encoded fields to `/__forms.html`; the matching static form definition registers `workflow-leak-audit` with Netlify Forms. Enable form detection under the site's Forms settings **before redeploying**. Verify the form appears after deployment, then make a real test submission and confirm receipt under Forms (also check Spam). A local Next server does not emulate Netlify Forms processing.

Set email notifications in Netlify's Forms settings to the desired mailbox and verify delivery. Notifications are not configured by this repository. Netlify submissions are stored in Netlify, separately from existing Sites D1 leads; no existing data is moved. The HTML field requirements and Netlify spam/honeypot filtering apply to this form; the original D1 endpoint's custom validation is specific to Sites.

Netlify has no Cloudflare D1 binding. The Next webpack configuration replaces `cloudflare:workers` with an empty environment module so the retained legacy `/api/inquiries` endpoint fails with 503 instead of claiming to save a lead. The Netlify browser form does not call that endpoint. Vite/Sites retains its real Cloudflare import and D1 behavior. Do not use a generic static-assets upload for the original Worker build.

To reproduce the Netlify build locally:

```sh
NEXT_PUBLIC_INQUIRY_BACKEND=netlify pnpm run build:netlify
```

## Migration verification

Verified with Node 24.19.0 and pnpm 11.25.0: clean dependency installation with `--frozen-lockfile` (628 packages from the available offline cache), portable production build, `tsc --noEmit`, local D1 migration, and source/exclusion checks. Application files, styles, favicon, schema, and existing migration are unchanged from the original Sites source.

The original endpoint also passed an isolated check with an in-memory SQLite adapter: invalid JSON, missing fields, honeypot without insertion, valid insertion with `status = 'new'`, declared oversized requests, and unavailable storage. That check does not prove Workers HTTP integration. A built-server HTTP smoke test could not run here because Wrangler exited with `uv_interface_addresses returned Unknown system error 1` while enumerating network interfaces. Browser rendering and an end-to-end request through the built Worker remain unverified in this migration environment. No production form submissions were made.

## Netlify repair verification

Standard Next.js production build (including TypeScript), the retained portable Vinext build, lint on modified TypeScript files, and local Next HTTP checks passed. HTTP checks covered the landing page, static form definition, and the legacy endpoint returning 503 without D1. Dependencies were reused from the existing verified checkout; a new dependency installation was not repeated. Netlify adapter execution, deployed form capture, and email delivery remain to be verified after the PR is deployed.
