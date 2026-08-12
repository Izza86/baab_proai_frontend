Purpose
-------
This file tells AI coding agents how to be immediately productive in this repository (frontend React + Vite). Keep suggestions tightly scoped to discoverable project patterns and existing files.

Quick Start (dev)
- Install: `npm install`
- Dev server: `npm run dev` (Vite; default port 5173)
- Build: `npm run build`

Architecture — Big Picture
- Frontend: TypeScript + React + Vite. Entry: `src/main.tsx` -> `src/routes/AppRouter.tsx`.
- UI primitives live under `src/components/ui/*` (each component has a `.module.css`).
- Layouts and shared pieces under `src/components/layout/*` (see `MainLayout.tsx`, `Navbar.tsx`, `Sidebar.tsx`).
- App state: context providers in `src/context/` (`AuthContext.tsx`, `ToastContext.tsx`).
- Hooks: reusable logic in `src/hooks/` (`useForm.ts`, `useToast.ts`).
- API surface: small service wrappers in `src/services/*` (e.g. `itemsApi.ts`).
- Third-party integration: Supabase client in `src/lib/supabaseClient.ts`.

Conventions & Patterns (do these exactly)
- Styling: CSS Modules per component (`Component.module.css`) and global design tokens in `src/styles/globals.css`.
- Components: place presentational components under `src/components/ui/Name/Name.tsx` with matching CSS module and export default.
- Layouts: keep page-level layout in `src/components/layout` and use `AppRouter` to wrap routes.
- Contexts: prefer React Context for cross-cutting concerns. Example: `ToastContext` + `useToast()` hook. Use `AuthContext` for auth state and protected routes.
- Routing: uses `react-router-dom`. Protected routes are implemented in `src/components/ProtectedRoute.tsx` and referenced from `src/routes/AppRouter.tsx`.

Helpful Code Examples
- Show a toast:
  - `const toast = useToast(); toast.success("Saved")`
- Auth check in a component:
  - `const { user } = useContext(AuthContext)`
- Add a UI component:
  1. Create folder `src/components/ui/NewComp/`
  2. Add `NewComp.tsx` and `NewComp.module.css` following existing components.

Where to look for common tasks
- Layout & navigation: `src/components/layout/MainLayout.tsx`, `Navbar.tsx`, `Sidebar.tsx`
- Pages: `src/pages/*` (Dashboard, Login, Profile, Settings, NotFound)
- Forms & validation: `src/hooks/useForm.ts` (existing helper patterns)
- API calls: `src/services/itemsApi.ts` and `src/lib/supabaseClient.ts`

Build / Debug Notes
- Vite dev server runs on 5173 by default; CORS/backend calls should target that during local dev.
- Use browser devtools console: no red errors expected on a clean `npm run dev`.
- Build must complete with zero warnings for trial submissions (`npm run build`).

Branching / PR naming (follow user's trial instructions)
- Feature branches: `feature/day-1-frontend`, `feature/day-2-backend`, etc.

What not to change without ask
- Don't refactor global directory layout or rename `src/context`/`src/hooks` without discussion — many files import these paths.
- Avoid changing Vite or TypeScript config unless fixing a discovered blocker.

If you need more context
- Open `src/lib/supabaseClient.ts` to confirm environment usage for Supabase keys.
- Check `src/context/` to see how providers are composed in `src/main.tsx`.

If you update this file
- Preserve any existing `.github/copilot-instructions.md` content and merge manually when required.

Ready for feedback: I can merge adjustments or inspect the two project folders on your E: drive when you share their paths.
