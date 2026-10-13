# Mario Gutiérrez — Resume Site

A single-page resume site for Mario Gutiérrez, Backend Software Engineer. It shows experience, skills, education and languages, offers a downloadable PDF CV, and has a spam-protected contact form. The website and the PDF are built from the same JSON data, so they always match.

**Live:** [mario-gutierrez.com](https://mario-gutierrez.com)

## The problem it solves

Recruiters usually see a candidate twice: once as a web profile and once as a PDF attached to an application. When those are maintained separately, they drift apart: an updated role on the site, an outdated PDF in the inbox. This project keeps a single source of truth. Edit the data once, push, and both the website and the CV update together.

It also gives recruiters a direct way to get in touch without a personal email address published on the page, and the form is protected against automated spam.

## My role and process

Solo project: design, implementation, CV pipeline and deployment.

- **Content as data.** All resume content lives in `src/data/` (`cv.json`, `experience.json`, `profile.json`) and is typed in `src/types/`. Components only render it, so updating the resume never requires touching UI code.
- **Derived, not hard-coded, figures.** Years of experience, number of companies, role durations, the career timeline and per-language "years of use" bars are calculated from start/end dates at render time (`src/lib/career.ts`, `src/lib/dates.ts`). Nothing goes stale as time passes.
- **API-themed design.** Each section is labelled like an endpoint (`GET /experience`, `GET /skills`, `POST /contact`), matching the backend focus of the profile. The site supports light, dark and system themes, and the saved choice is applied before first paint to avoid a flash.
- **CV generation pipeline.** A TypeScript script (`scripts/generate-cv-tex.ts`) reads the same JSON files and writes a LaTeX document. It escapes special characters and recomputes years per language. CI compiles that document to PDF and publishes it with the site.
- **Hardened contact form.** Submissions go to a separate backend service ([contact-api](https://github.com/MarioAGtzC/contact-api)). Before anything is sent, the form requires a bot-verification token, silently discards submissions that fill a hidden honeypot field, and enforces a 30-second cooldown between messages.
- **Automated deployment.** Every push to `main` triggers a GitHub Actions workflow that regenerates the CV, verifies it, builds the site and deploys it.

## Technologies and tools

**Language and framework**
- **TypeScript** across the UI, the data types and the CV generation script.
- **React 19** for the single-page UI, with the **React Compiler** enabled for automatic memoization.
- **Vite** as dev server and production build tool.

**Styling**
- **Tailwind CSS v4** with custom design tokens for the light/dark color palette and self-hosted Geist variable fonts.

**Content and documents**
- **Structured JSON** as the single source of truth for both the website and the PDF.
- **LaTeX (XeLaTeX)** typesets the downloadable CV from the generated `.tex` file, compiled in CI via `xu-cheng/latex-action`.
- **tsx** runs the TypeScript CV generator directly in the pipeline.

**Integrations**
- **Bot protection via Cloudflare Turnstile** on the contact form (`@marsidev/react-turnstile`).
- **Contact backend** in a separate service ([contact-api](https://github.com/MarioAGtzC/contact-api)), called over HTTP with its URL injected at build time.
- **Toast notifications** (`react-toastify`) for form success and error feedback.

**CI/CD and hosting**
- **GitHub Actions**: install → generate `cv.tex` → compile PDF → check that text can be extracted from the PDF → build → deploy.
- **PDF quality gate with poppler-utils (`pdftotext`)**: the build fails if the compiled CV has no extractable text, which catches font or LaTeX failures that would produce a blank or image-only PDF.
- **GitHub Pages** with a custom domain for static hosting. Secrets (Turnstile site key, contact API URL) come from repository secrets at build time.

**Testing**
- No automated test suite yet. Quality checks are TypeScript type-checking (`tsc -b` in the build), ESLint, and the PDF validation step in CI.

## Results and impact

No usage metrics are tracked, so the impact is qualitative:

- **The site and the CV can't fall out of sync.** Both are generated from the same data on every deploy, so the PDF a recruiter downloads always matches the website.
- **Shipping an update takes one push.** No manual PDF export or upload step.
- **Figures stay current automatically.** Experience totals and durations are computed from dates, not typed by hand.
- **Spam protection without an account requirement.** Visitors write a message and send it. The Turnstile check, honeypot and cooldown filter out automated abuse.
- **A broken CV can't be deployed.** The PDF validation step fails the pipeline before an unreadable CV reaches production.

## Screenshots and live demo

- **Live demo:** [mario-gutierrez.com](https://mario-gutierrez.com)
- **Screenshots:** not yet included. Add captures of the hero, experience timeline, skills, and contact sections (in light and dark themes) to a `docs/screenshots/` folder and embed them here.
- The repository includes a social link-preview card at [`public/og-image.png`](public/og-image.png). It is not a screenshot of the site.

## Links

- **Live site:** [mario-gutierrez.com](https://mario-gutierrez.com)
- **Case study:** [portfolio.mario-gutierrez.com/portfolio/resume](https://portfolio.mario-gutierrez.com/portfolio/resume)
- **Related repositories:**
  - [portfolio-new](https://github.com/MarioAGtzC/portfolio-new): portfolio site with project case studies
  - [contact-api](https://github.com/MarioAGtzC/contact-api): backend service behind the contact form
