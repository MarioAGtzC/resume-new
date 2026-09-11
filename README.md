# Mario Gutierrez — Personal Portfolio & Resume Site

A single-page personal website that presents Mario Gutierrez's professional profile, background, and work experience, and lets visitors download an always-up-to-date PDF CV or get in touch directly through the site.

## The Problem It Solves

A resume in a single static PDF format goes stale quickly and gives recruiters no sense of who the person behind it is beyond a wall of text. This project solves that by pairing a living, interactive portfolio (bio, highlights, experience timeline) with a professionally formatted PDF resume that is generated automatically from the same source of truth — so the online profile and the downloadable CV never drift out of sync. It also removes the friction and privacy concerns of publishing a personal email address by offering a built-in, spam-protected contact form as the way for recruiters and collaborators to reach out.

## My Role and Process

This was an end-to-end solo build: design, front-end implementation, content architecture, and deployment pipeline.

- **Content-first architecture** — All personal content (profile info, bio, skills, work experience, CV metadata) lives in structured JSON files (`src/data/*.json`) rather than being hardcoded in components, so the site's copy can be updated without touching UI code.
- **Component-based UI** — Built as a scrolling, single-page React app with distinct sections (Home, About Me, Resume, Contact Me) driven by a central section registry (`src/config/sections.ts`), with scroll-position tracking to highlight the active section in navigation.
- **Automated CV pipeline** — Rather than maintaining a PDF by hand, I wrote a script (`scripts/generate-cv-tex.ts`) that reads the same JSON data used by the website and generates a LaTeX (`cv.tex`) document, which is then compiled to PDF in CI. This guarantees the downloadable resume always reflects the latest content shown on the site.
- **Hardened contact flow** — Implemented a contact form with bot protection, a honeypot field, and client-side rate limiting before messages are relayed to a backend API, treating the public-facing form as an abuse surface to defend rather than a trivial UI element.
- **CI/CD deployment** — Set up a GitHub Actions workflow that installs dependencies, generates and compiles the CV, validates the resulting PDF actually contains extractable text (catching silent LaTeX/font failures before they reach production), builds the site, and deploys it to GitHub Pages under a custom domain.

## Technologies and Tools Used

- **React 19 + TypeScript** — Core UI framework and type safety for all components, data models, and configuration.
- **Vite (with Rolldown) + React Compiler** — Build tooling and dev server, with the React Compiler Babel plugin enabled for automatic component memoization/optimization.
- **Cloudflare Turnstile** (`@marsidev/react-turnstile`) — Bot/CAPTCHA protection on the contact form, paired with a hidden honeypot field and a client-side cooldown to reduce spam submissions.
- **RxJS** — Publishes scroll/viewport events (via a `Subject`) so the active section can be tracked and broadcast across the app without prop drilling.
- **react-toastify** — User-facing toast notifications for contact form success/error states.
- **LaTeX (XeLaTeX) via `xu-cheng/latex-action`** — Typesets the downloadable PDF resume from a generated `.tex` file, run as part of the CI pipeline rather than maintained as a static asset.
- **Custom `tsx` build script** — Transforms structured JSON resume data into a LaTeX document at build time, keeping the website and the PDF resume as a single source of truth.
- **poppler-utils (`pdftotext`)** — Used in CI as an automated quality gate that verifies the compiled PDF contains real, extractable text before it's published.
- **GitHub Actions** — CI/CD pipeline: install, generate CV, compile PDF, validate PDF, build site, and deploy — fully automated on every push to `main`.
- **GitHub Pages (custom domain)** — Static hosting for the production site, served from `mario-gutierrez.com`.
- **ESLint + TypeScript-ESLint** — Static analysis and type-aware linting across the codebase.

## Results / Impact

- Eliminated manual CV maintenance: the resume PDF is regenerated and validated automatically on every deploy, removing an entire class of "forgot to update the PDF" errors and guaranteeing consistency between the live site and the downloadable resume.
- Replaced a static, one-shot resume with an interactive profile that highlights skills and experience in a more scannable, engaging format for recruiters.
- Reduced spam/abuse risk on the public contact channel through layered protection (Turnstile challenge, honeypot field, and submission throttling) without requiring visitors to create an account or solve intrusive puzzles.
- Fully automated, zero-touch deployment pipeline: a push to `main` is the only action required to ship content or design changes to production.

## Screenshots / Live Demo

- **Live site:** [mario-gutierrez.com](https://mario-gutierrez.com/)
- Screenshots of the Home, About Me, Resume, and Contact sections should be added here (e.g. under `docs/screenshots/`) to give readers a visual preview without needing to open the live site.

## Repository

[github.com/MarioAGtzC/resume-new](https://github.com/MarioAGtzC/resume-new)
