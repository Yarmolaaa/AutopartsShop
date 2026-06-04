# Shop — React Full-Stack Coursework

A single-page shop application built to demonstrate a modern React stack:
**React + Redux Toolkit** with **three async middleware** (Thunk, Saga,
Redux-Observable), **Redux-Form**, **React Query**, an **Axios** HTTP-client
class hierarchy with a **mock backend**, **shadcn/ui**, and a full test pyramid
(**Jest + React Testing Library** + **Playwright** E2E).

It also includes a **cart + checkout** flow (add to cart → cart page → protected
checkout → order confirmation). The **UI is entirely in Ukrainian** (prices in ₴);
strings are hardcoded rather than behind an i18n library, since only one language
is needed.

Everything runs on `localhost` against an in-memory fake backend, and is wired so
that switching to a real database later is a one-line change.

---

## Quick start

```bash
npm install          # (uses .npmrc → legacy-peer-deps for redux-form)
npm run dev          # http://localhost:5173
```

**Demo login:** `demo@shop.dev` / `password123`

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Jest unit + component + snapshot tests |
| `npm run test:coverage` | Jest with coverage |
| `npm run e2e` | Playwright E2E (boots the dev server automatically) |

> First E2E run only: `npx playwright install chromium`.

---

## How each coursework section is satisfied

| § | Requirement | Where |
| --- | --- | --- |
| 3.1 | UI design, intuitive nav, **live search** | `pages/`, debounced search via the Redux-Observable epic |
| 3.2 | React + **Redux + DevTools** + middleware | `src/store/index.ts` (DevTools on in dev) |
| 3.3 | Navigation system | `react-router-dom`, `components/layout/` + `App.tsx` |
| 3.4 | Axios **base HTTP-client class** + child classes + **mock** | `src/api/` |
| 3.5 | Auth forms with **Redux-Form** + validation | `src/components/auth/` |
| 3.6 | Products list, details, search/filter/sort, logout, edit profile | `pages/`, `components/products/` |
| 3.7 | **Jest + RTL** unit + snapshot tests | `*.test.ts(x)` |
| 3.8 | **E2E** tests | `e2e/` (Playwright) |

---

## Architecture

### State & async — one strategy per feature

The three middleware are intentionally used where each is strongest, rather than
mixed within a single flow:

| Feature | Strategy | Why |
| --- | --- | --- |
| Auth (login / register / profile) | **Redux-Thunk** (`createAsyncThunk`) + a hand-written `logout` thunk | Simple request → state transition |
| Products list fetch | **Redux-Saga** (`takeLatest`) | Imperative, cancellable one-shot flow |
| Live search | **Redux-Observable** (`debounceTime → switchMap`) | A *stream* of keystrokes; `switchMap` cancels stale requests |
| Product details | **React Query** (`useQuery`) | Read-heavy server-state with caching |
| Cart (add / remove / quantity) | **plain Redux slice** (persisted to `localStorage`) | Synchronous local state — no async middleware needed |
| Checkout | **Redux-Thunk** (`placeOrder`) → mock `POST /orders` | A real server round-trip |

`store/`
```
index.ts          configureStore: thunk (default) + saga + epic middleware, DevTools
root-reducer.ts   auth + products + search + redux-form `form` reducer
root-saga.ts      root-epic.ts   hooks.ts (typed useAppDispatch/useAppSelector)
auth/   products/   search/      (slice + its saga/epic)
```

### Network layer (§3.4)

```
api/
  http-client.ts   HttpClient base class → get / post / update(PUT) / delete
  auth-api.ts      AuthApi      extends HttpClient  ('/auth')
  products-api.ts  ProductsApi  extends HttpClient  ('/products')
  mock/            axios-mock-adapter fake backend + seed data
```

All clients share **one Axios instance**, so the mock attaches once and intercepts
everything. A request interceptor adds the bearer token from `localStorage`.

### Swapping the mock for a real backend

1. Set `VITE_API_BASE_URL` in `.env` to your server (e.g. `http://localhost:4000/api`).
2. Delete the single `setupMockApi()` call in `src/main.tsx`.

No component, store, or API-class code changes — the class hierarchy already issues
real `get/post/put/delete` calls.

---

## Testing

- **Logic** (pure & deterministic): `lib/sort`, `auth/validators`, all reducers,
  the saga worker (generator stepping), and the search epic (RxJS pipeline).
- **Integration:** `ProductsApi` over `HttpClient` against `axios-mock-adapter`.
- **Components (RTL):** `ProductCard` (+ snapshot), `LoginForm` (redux-form
  validation + submit), `ProductFilters` (per-keystroke live search).
- **E2E (Playwright):** browsing + live search + details, and the full auth
  journey (login, logout, protected-route redirect, registration).

Tests assert **intent** (e.g. invalid forms must not submit; `switchMap` returns
only the latest result), not just that values exist.

---

## Tech-stack notes

- **React 18** (not 19) for `redux-form` compatibility.
- **`@reduxjs/toolkit` 1.9 + `react-redux` 8** — the last combination tested
  against the (deprecated-but-required) `redux-form`. `.npmrc` relaxes peer
  resolution accordingly.
- **Vite** (SPA) rather than Next.js: the spec describes client-side Redux,
  routing, and mocked Axios throughout.
- **shadcn/ui** components live in `src/components/ui/` (copied in and owned by the
  project — the shadcn model). `components.json` lets you `npx shadcn@latest add …`
  more later.
