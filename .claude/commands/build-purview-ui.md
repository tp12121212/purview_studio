# Claude Code Prompt — Purview Compliance Web UI (Greenfield Build)

Copy the entire block below and paste it into Claude Code as a single task.

```
You are scaffolding a greenfield React + Vite + Tailwind CSS v4 web application for a multitenant Microsoft Purview compliance management platform called "Compass". This is an empty GitHub repo — there is no existing code. Your job is to create the full project skeleton, design system foundation, layout shell, routing, and core UI components so that subsequent work can build features on top of a solid, opinionated base.

## CONTEXT

This is an enterprise SaaS admin console for managing Microsoft Purview DLP policies, sensitivity labels, sensitive information types, and compliance operations across multiple M365 tenants. The backend (not in scope here) exposes a REST API and SignalR hub for streaming PowerShell operation output. The frontend consumes that API. For now, all data should come from mock data files so the UI is fully navigable and demonstrable without a backend.

The UI must NOT look like a default shadcn/ui template, a Microsoft Fluent clone, or a generic admin dashboard. It has a specific design system documented below. Follow it precisely.

## TECH STACK — install and configure all of these

- React 19 + Vite (latest)
- TypeScript (strict mode)
- Tailwind CSS v4 with @theme directive for design tokens
- React Router v7 (file-based or config-based routing with lazy-loaded routes)
- TanStack Query v5 (server state, stale-while-revalidate)
- TanStack Table v8 (headless data grid)
- Zustand (client UI state: theme, density, panel positions, tenant selection)
- React Hook Form + Zod (form validation)
- Radix UI primitives (dialog, popover, dropdown-menu, tooltip, tabs, separator, scroll-area, collapsible)
- Sonner (toast notifications)
- Lucide React (icons)
- clsx + tailwind-merge (class merging utility)

Do NOT install shadcn/ui as a package. We will build our own component primitives on top of Radix.

## DESIGN SYSTEM — implement this exactly

### Color Palette: "Palette A — Deep Teal & Warm Amber" (dark-mode-first)

Use CSS custom properties on [data-theme="dark"] (default) and [data-theme="light"]. Define them in your Tailwind v4 @theme block so they auto-generate utility classes. The dark theme is the DEFAULT — the app loads in dark mode.

Dark mode tokens:
  --color-bg-primary: #0E1A1E
  --color-bg-secondary: #142226
  --color-bg-tertiary: #1B2D32
  --color-bg-elevated: #1F3238
  --color-bg-overlay: rgba(0,0,0,0.65)
  --color-text-primary: #E8F0F2
  --color-text-secondary: #9BB5BD
  --color-text-muted: #6B8892
  --color-border-default: #2A4248
  --color-border-subtle: #1F3238
  --color-border-strong: #3D5A62
  --color-accent-primary: #26A8AD
  --color-accent-secondary: #F0B429
  --color-accent-destructive: #EF5350
  --color-accent-warning: #FFB74D
  --color-accent-success: #66BB6A
  --color-hover: rgba(38,168,173,0.12)
  --color-active: rgba(38,168,173,0.20)
  --color-focus-ring: #26A8AD
  --color-disabled: rgba(232,240,242,0.30)

Light mode tokens:
  --color-bg-primary: #FAFBFC
  --color-bg-secondary: #F0F2F4
  --color-bg-tertiary: #E4E8EB
  --color-bg-elevated: #FFFFFF
  --color-bg-overlay: rgba(0,0,0,0.40)
  --color-text-primary: #1A2B32
  --color-text-secondary: #4A6068
  --color-text-muted: #7A9098
  --color-border-default: #D8DFE3
  --color-border-subtle: #E4E8EB
  --color-border-strong: #B8C4CA
  --color-accent-primary: #0D7377
  --color-accent-secondary: #D4930D
  --color-accent-destructive: #C62828
  --color-accent-warning: #E8A317
  --color-accent-success: #2E7D32
  --color-hover: rgba(13,115,119,0.08)
  --color-active: rgba(13,115,119,0.14)
  --color-focus-ring: #0D7377
  --color-disabled: rgba(26,43,50,0.30)

Shadow tokens (double opacity in dark mode):
  --shadow-sm (dark): 0 1px 2px rgba(0,0,0,0.40)
  --shadow-md (dark): 0 4px 8px rgba(0,0,0,0.50)
  --shadow-lg (dark): 0 8px 24px rgba(0,0,0,0.60)
  --shadow-sm (light): 0 1px 2px rgba(0,0,0,0.08)
  --shadow-md (light): 0 4px 8px rgba(0,0,0,0.12)
  --shadow-lg (light): 0 8px 24px rgba(0,0,0,0.16)

Border radius: use 2px for small elements (badges, inline code), 4px for inputs/buttons, 6px for cards/panels. Do NOT use the shadcn default 0.5rem (8px) rounded corners everywhere.

### Typography

Fonts: Inter (variable, woff2) for UI text. JetBrains Mono NL (variable, woff2) for all code/mono content. Load from Google Fonts or bundle as static assets — keep total font payload under 160KB.

Type scale (Major Second 1.125 ratio, 14px base, 4px line-height grid):
  --font-display: 32px / 36px / 600
  --font-h1: 28px / 32px / 600
  --font-h2: 24px / 28px / 600
  --font-h3: 20px / 24px / 600
  --font-body: 14px / 20px / 400
  --font-body-sm: 13px / 18px / 400
  --font-caption: 12px / 16px / 400
  --font-code-block: 13px / 20px / 400 (JetBrains Mono NL)
  --font-code-inline: 90% of parent / inherit / 400 (JetBrains Mono NL)

Only use weights 400 (regular), 500 (medium — table headers, form labels), 600 (semibold — headings), 700 (bold — critical warnings only). No thin/light weights.

OpenType features: enable font-variant-numeric: tabular-nums slashed-zero globally. Disable ligatures in all code/mono contexts.

Inline code styling: JetBrains Mono at 90% size, bg-tertiary background, 2-4px horizontal padding, 4px border-radius.

### Spacing Grid

Use a 4px base grid. All padding, margin, and gap values must be multiples of 4px. Define spacing tokens: 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px), 10(40px), 12(48px), 16(64px).

### Density Modes

Support two density modes stored in Zustand:
- "standard" (default): uses the type scale as defined above
- "compact": reduces every type token by one step (body→13px, body-sm→12px, caption→11px, code-block→12px). Table row height drops from 36px to 32px.

## LAYOUT SHELL — build this as the app's root layout

The layout uses a dual-sidebar with persistent operations panel:

┌────────────────────────────────────────────────────────────────┐
│ ┌──┬──────────┬──────────────────────────────────────────────┐ │
│ │  │          │ CONTEXT BAR (48px height)                    │ │
│ │N │ SUB-NAV  │─────────────────────────────────────────────│ │
│ │A │(180-240px│                                              │ │
│ │V │collapsibl│           MAIN CONTENT                       │ │
│ │  │)         │           (<Outlet /> from router)            │ │
│ │R │          │                                              │ │
│ │A │          │                                              │ │
│ │I │          │                                              │ │
│ │L │          │─────────────────────────────────────────────│ │
│ │  │          │ OPERATIONS PANEL (collapsible, bottom)       │ │
│ │48│          │ Collapsed: thin strip "3 ops · 1 running"    │ │
│ │px│          │ Expanded: scrollable operation queue          │ │
│ └──┴──────────┴──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘

Components to build:

1. **NavigationRail** (48px wide, always visible, far-left):
   - Icon-only buttons for major sections: Dashboard, DLP, Labels, Audit, Settings
   - Use Lucide icons. Active section gets accent-primary highlight.
   - Tenant switcher at bottom: colored circle with tenant initial. Production tenants show a red ring.
   - Tooltip on hover showing section name.

2. **SubNavPanel** (180-240px, collapsible):
   - Hierarchical tree nav for the active section (e.g., DLP → Policies, Rules, Alerts)
   - Keyboard arrow-key navigation
   - Pin/auto-collapse toggle
   - Recent/favorited items at top
   - Collapsible with a drag handle or toggle button

3. **ContextBar** (48px height, spans top of main area):
   - Left: Breadcrumb trail (e.g., DLP > Policies > Financial Data)
   - Center: Command palette trigger — a visible search input showing "⌘K" hint
   - Right: Operations badge (lightning icon + count), density toggle, theme toggle, user avatar dropdown

4. **OperationsPanel** (bottom of main area, collapsible, resizable):
   - Collapsed state: 32px strip showing "N operations · N running" with mini progress bar
   - Expanded state: list of operations grouped by state (failed first, then running, then completed)
   - Each operation row: cmdlet name, tenant, elapsed time, stage label, cancel button
   - Expandable rows show a terminal-like log output area (monospace, dark bg)
   - Keyboard navigation: J/K to traverse, Enter to expand

5. **CommandPalette** (⌘K overlay, center of screen):
   - Modal overlay with search input
   - Sections: Recent, Navigation, Actions (cmdlets), Search results
   - Keyboard navigable (arrow keys, Enter to select, Escape to close)
   - Wire up global ⌘K / Ctrl+K keyboard shortcut

## ROUTING — set up these routes with lazy loading

All routes should use React.lazy() with Suspense boundaries and skeleton fallbacks.

  /                          → redirect to /dlp/policies
  /dlp/policies              → DLP Policies list (master-detail split pane)
  /dlp/policies/:id          → DLP Policy detail
  /dlp/rules                 → DLP Rules list
  /dlp/alerts                → DLP Alerts list
  /labels/sensitivity        → Sensitivity Labels list
  /labels/retention          → Retention Labels list
  /labels/policies           → Label Policies list
  /audit/activity            → Activity Explorer
  /audit/content             → Content Explorer
  /settings                  → Settings page (theme, density, account)
  /settings/tenants          → Tenant management

## CORE UI COMPONENTS TO BUILD

Build these as reusable primitives in src/components/ui/. Each must support both themes, respect the design tokens, and use Radix primitives where applicable.

1. **Button** — variants: primary (accent-primary bg), secondary (ghost with border), destructive (accent-destructive), ghost (no border). Sizes: sm (28px h), md (32px h), lg (36px h). Always show focus-ring on keyboard focus.

2. **Input** — text input with label, optional description, error state. Uses bg-secondary background, border-default border, accent-primary focus border. 32px height (standard), 28px height (compact).

3. **Badge** — status badges: success (green), warning (amber), error (red), info (accent-primary), neutral (muted). Small text, 2px border-radius.

4. **Card** — bg-elevated background with border-default border. In dark mode, use border delineation for elevation (not just shadow). 6px border-radius.

5. **DataTable** — wrapper around TanStack Table with: sortable column headers, row selection checkboxes, compact 32px rows, tabular-nums on numeric columns, skeleton loading state, empty state. Support tree-data expansion (clicking a row shows child rows indented).

6. **InlineCode** — renders text in JetBrains Mono at 90% size with bg-tertiary background and 4px border-radius. For PowerShell cmdlet names in prose.

7. **CodeBlock** — multi-line code display in JetBrains Mono. Dark bg (bg-primary in both themes for contrast), line numbers in muted text, horizontal scroll for long lines. No line wrapping for regex patterns.

8. **Skeleton** — loading placeholder that pulses. Matches the shape of the content it replaces (text lines, table rows, cards).

9. **Tooltip** — Radix Tooltip with bg-elevated background, small text, 200ms delay.

10. **DropdownMenu** — Radix DropdownMenu styled with bg-elevated, border-default, hover state, keyboard navigation.

11. **Dialog** — Radix Dialog with overlay (bg-overlay), bg-elevated content, focus trap, Escape to close.

12. **Tabs** — Radix Tabs with bottom-border active indicator using accent-primary.

13. **SplitPane** — horizontal resizable split pane for master-detail views. Draggable divider. Min/max widths. Persists position in Zustand.

## MOCK DATA

Create src/mocks/ with realistic mock data files:

- tenants.ts — 3 tenants: "Contoso Ltd" (production, red ring), "Fabrikam Inc" (production), "Woodgrove Dev" (development, no danger cue). Each has id, name, domain, environment ("production" | "development"), color (for avatar).

- dlpPolicies.ts — 8-10 DLP policies with realistic names like "Block External SSN Sharing", "Financial Data Protection - APAC", "Healthcare PHI Compliance". Each has: id, name, description, enabled (boolean), mode ("enforce" | "test" | "disabled"), createdDate, modifiedDate, rules (array of child objects with conditions), priority, tenantId.

- sensitivityLabels.ts — 6-8 labels: "Public", "Internal", "Confidential", "Highly Confidential", "Restricted - Finance", "Restricted - Legal". Each has: id, name, description, priority, color, tooltip, parentId (for hierarchy), isActive.

- operations.ts — 5-6 mock operations in various states: 2 completed (Get-DlpCompliancePolicy, Get-Label), 1 running (New-DlpCompliancePolicy with progress at 67%, stage "Applying retention policies..."), 1 failed (Export-ActivityExplorerData with error message), 1 queued. Each has: id, cmdlet, tenant, status ("queued"|"running"|"completed"|"failed"), startedAt, completedAt, progress (0-100), currentStage, output (array of log lines), error.

- users.ts — current user object: name, email, role, avatar initials.

## ZUSTAND STORES

Create src/stores/:

- useThemeStore.ts — theme ("dark"|"light"), density ("standard"|"compact"), toggleTheme(), setDensity()
- useTenantStore.ts — currentTenantId, tenants[], switchTenant(id), preserves current route on switch
- useLayoutStore.ts — subNavCollapsed, subNavPinned, operationsPanelExpanded, operationsPanelHeight, splitPanePosition, setters for each
- useOperationsStore.ts — operations[], addOperation(), updateOperation(), removeOperation(), counts by status

## TANSTACK QUERY SETUP

Create src/api/ with:
- queryClient.ts — configured QueryClient with default staleTime: 30_000, gcTime: 300_000
- queryKeys.ts — factory pattern: queryKeys.policies.all(tenantId), queryKeys.policies.detail(tenantId, id), queryKeys.labels.all(tenantId), etc. ALL keys prefixed with tenantId.
- Mock API functions that return data from the mock files with artificial delays (200-800ms random) to simulate real latency. These will be swapped for real fetch calls later.

## PROJECT STRUCTURE

Organize the project as:

  compass/
  ├── index.html
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  ├── tailwind.config.ts (or CSS-only config via @theme in v4)
  ├── public/
  │   └── fonts/
  │       ├── Inter-Variable.woff2
  │       └── JetBrainsMono-NL-Variable.woff2
  ├── src/
  │   ├── main.tsx
  │   ├── App.tsx
  │   ├── index.css                    ← Tailwind directives + @theme tokens + font-face
  │   ├── routes/
  │   │   ├── index.tsx                ← route config with lazy imports
  │   │   ├── dlp/
  │   │   │   ├── policies.tsx
  │   │   │   ├── policy-detail.tsx
  │   │   │   ├── rules.tsx
  │   │   │   └── alerts.tsx
  │   │   ├── labels/
  │   │   │   ├── sensitivity.tsx
  │   │   │   ├── retention.tsx
  │   │   │   └── policies.tsx
  │   │   ├── audit/
  │   │   │   ├── activity.tsx
  │   │   │   └── content.tsx
  │   │   └── settings/
  │   │       ├── index.tsx
  │   │       └── tenants.tsx
  │   ├── components/
  │   │   ├── ui/                      ← reusable primitives (Button, Input, Badge, etc.)
  │   │   ├── layout/                  ← NavigationRail, SubNavPanel, ContextBar, OperationsPanel, SplitPane
  │   │   └── features/                ← CommandPalette, TenantSwitcher, ThemeToggle, DensityToggle
  │   ├── stores/                      ← Zustand stores
  │   ├── api/                         ← TanStack Query client, keys, mock fetchers
  │   ├── mocks/                       ← Mock data files
  │   ├── hooks/                       ← Custom hooks (useKeyboardShortcut, useResizable, etc.)
  │   ├── lib/                         ← Utility functions (cn(), formatDate(), etc.)
  │   └── types/                       ← TypeScript interfaces and types
  └── .gitignore

## IMPLEMENTATION PRIORITIES

Execute in this order:

1. Project init: `npm create vite@latest compass -- --template react-ts`, install all deps, configure Tailwind v4, set up fonts.

2. Design tokens: Create the full CSS custom property system in index.css with [data-theme="dark"] as default and [data-theme="light"] override. Wire into Tailwind @theme so utilities like `bg-bg-primary`, `text-text-secondary`, `border-border-default` etc. work natively.

3. Typography: Set up @font-face declarations, the type scale as CSS classes or Tailwind utilities, and the OpenType features.

4. UI primitives: Build all 13 components listed above. Each should be a clean, well-typed component with variants managed via clsx/tailwind-merge.

5. Layout shell: Build the NavigationRail, SubNavPanel, ContextBar, OperationsPanel. Wire them into a root layout component that wraps the router outlet.

6. Zustand stores: Implement all four stores. Wire theme/density stores to document attributes and CSS.

7. Routing: Set up all routes with lazy loading. Each route page should render at minimum a heading and breadcrumb so navigation is testable.

8. Mock data + TanStack Query: Create mock data, query keys, and mock fetchers. Wire the DLP Policies page to actually render a DataTable with the mock data.

9. Command Palette: Build the ⌘K overlay with navigation items and recent actions.

10. DLP Policies page: Build this as the showcase page — a master-detail split pane with a DataTable on the left (sortable, filterable, tree-expandable) and a detail inspector on the right that slides in when a policy is selected. This page proves the layout pattern works.

## CRITICAL REQUIREMENTS

- The app MUST load in dark mode by default. Light mode is the alternative.
- No shadcn/ui package. Build components on Radix primitives directly.
- All border-radius values are small and sharp (2-6px). No big rounded corners.
- Neutrals have a TEAL HUE BIAS — they are NOT pure grey. This is what makes the palette distinctive.
- Every interactive element must have a visible focus ring (accent-primary, 2px offset) for keyboard accessibility.
- Use border delineation (not just shadow) for elevated surfaces in dark mode.
- Font-variant-numeric: tabular-nums slashed-zero on all text globally.
- The Operations Panel strip at the bottom must be visible on every page even when collapsed.
- The Navigation Rail tenant switcher must show which tenant is active with a color indicator.
- Production tenants display a red accent ring as a danger cue on the tenant avatar.
- Code/cmdlet names in prose ALWAYS use the InlineCode component (JetBrains Mono, bg-tertiary, small padding).
- All data tables use 32px compact row height with 13px text.
- Disable CSS transitions during theme toggle for instant switching (add a `no-transition` class to <html> briefly).

## WHAT NOT TO BUILD YET

- No real API integration (mock everything)
- No authentication / MSAL (just mock the user)
- No SignalR integration (mock operation progress)
- No Policy Diff Viewer (complex feature for later)
- No SIT Match Annotator (complex feature for later)
- No Rule Composer / form authoring (complex feature for later)
- No real PowerShell operation execution

The goal is a fully navigable, visually complete shell with one working data page (DLP Policies) that demonstrates the design system, layout architecture, and component library. Everything should be wired together so a developer can pick up any route and start building the real feature.

After completing all steps, run `npm run build` to verify the production build succeeds with no TypeScript errors, then run `npm run dev` and confirm the dev server starts. List any known issues or TODOs at the end.
```
