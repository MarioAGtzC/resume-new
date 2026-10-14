/**
 * scripts/generate-cv-tex.ts
 *
 * Reads structured resume data (cv.json + experience.json) and generates
 * a cv.tex file ready to be compiled by the LaTeX Action in CI.
 *
 * Usage: npx tsx scripts/generate-cv-tex.ts
 *
 * Expects:
 *   - src/data/cv.json
 *   - src/data/experience.json
 * Outputs:
 *   - cv.tex (repo root, matching `root_file: cv.tex` in the workflow)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// ---------- Types ----------

interface CvLink {
  label: string;
  href: string;
}

interface CvHeader {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  cvLinks: CvLink[];
}

interface LanguageSkill {
  name: string;
  startDate: string; // 'YYYY-MM'
}

interface TechnicalSkills {
  languages: LanguageSkill[];
  backend: string;
  frontend: string;
  databases: string;
  cloud: string;
  other: string;
}

interface Education {
  degree: string;
  graduationDate: string;
  institution: string;
}

interface SpokenLanguage {
  language: string;
  level: string;
  certLabel?: string;
  certLink?: string;
}

interface CvData {
  header: CvHeader;
  cvSummary: string;
  keyAchievements: string[];
  technicalSkills: TechnicalSkills;
  education: Education;
  languages: SpokenLanguage[];
}

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

// ---------- LaTeX escaping ----------

/**
 * Escapes LaTeX special characters in free-text content coming from JSON.
 * Must run on every piece of user-authored text before it's injected into
 * the .tex template, or compilation can fail (or silently render wrong).
 */
function escapeLatex(input: string): string {
  return input
    .replace(/—/g, '--')
    .replace(/–/g, '-')
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

// ---------- Years-of-experience calculation ----------

function calculateYears(startDate: string, asOf: Date = new Date()): number {
  const [year, month] = startDate.split('-').map(Number);
  const start = new Date(year, month - 1);

  const totalMonths =
    (asOf.getFullYear() - start.getFullYear()) * 12 +
    (asOf.getMonth() - start.getMonth());

  return Math.floor(totalMonths / 12);
}

function formatLanguagesLine(languages: LanguageSkill[]): string {
  return languages
    .map((lang) => {
      const years = calculateYears(lang.startDate);
      const label = years < 1 ? '$<$1 year' : `${years}+ ${years === 1 ? 'year' : 'years'}`;
      return `${escapeLatex(lang.name)} (${label})`;
    })
    .join(', ');
}

// ---------- Template builders ----------

function buildHeaderLinks(links: CvLink[]): string {
  return links
    .map((link) => `\\href{${link.href}}{${escapeLatex(link.label)}}`)
    .join(' \\;$\\vert$\\;\n    ');
}

function buildItemizeList(items: string[]): string {
  const lines = items.map((item) => `    \\item ${escapeLatex(item)}`);
  return `\\begin{itemize}\n${lines.join('\n')}\n\\end{itemize}`;
}

function buildExperienceSection(experience: ExperienceEntry[]): string {
  return experience
    .map((entry, index) => {
      const spacing = index === 0 ? '' : '\\vspace{1pt}\n';
      return (
        `${spacing}\\textbf{${escapeLatex(entry.role)}} \\hfill \\textit{${escapeLatex(entry.period)}}\\\\\n` +
        `\\textit{${escapeLatex(entry.company)}}\n` +
        buildItemizeList(entry.bullets)
      );
    })
    .join('\n\n');
}

function buildLanguagesSection(languages: SpokenLanguage[]): string {
  const lines = languages.map((lang) => {
    let line = `    \\item \\textbf{${escapeLatex(lang.language)}:} ${escapeLatex(lang.level)}`;
    if (lang.certLink && lang.certLabel) {
      line += ` \\href{${lang.certLink}}{${escapeLatex(lang.certLabel)}}`;
    }
    return line;
  });
  return `\\begin{itemize}\n${lines.join('\n')}\n\\end{itemize}`;
}

// ---------- Main ----------

function main() {
  const cvDataPath = resolve(process.cwd(), 'src/data/cv.json');
  const experienceDataPath = resolve(process.cwd(), 'src/data/experience.json');
  const outputPath = resolve(process.cwd(), 'cv.tex');

  const cv: CvData = JSON.parse(readFileSync(cvDataPath, 'utf-8'));
  const experience: ExperienceEntry[] = JSON.parse(readFileSync(experienceDataPath, 'utf-8'));

  const { header, cvSummary, keyAchievements, technicalSkills, education, languages } = cv;

  const tex = `\\documentclass[10pt,letterpaper]{article}

% ---------- Packages ----------
\\usepackage[margin=0.55in,top=0.5in,bottom=0.5in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{fontspec}
\\usepackage{xcolor}
\\usepackage{tabularx}

% ---------- Font ----------
\\setmainfont{Latin Modern Sans}

% ---------- Colors ----------
\\definecolor{darkgray}{RGB}{40,40,40}
\\definecolor{accent}{RGB}{20,60,110}

% ---------- Hyperlink config ----------
\\hypersetup{
    colorlinks=true,
    urlcolor=accent,
    linkcolor=accent
}

% ---------- Section title style ----------
\\titleformat{\\section}
  {\\normalfont\\large\\bfseries\\color{accent}}
  {}{0em}{}
  [\\vspace{-4pt}{\\color{accent}\\hrule height 1pt}\\vspace{1pt}]
\\titlespacing{\\section}{0pt}{6pt}{2pt}

% ---------- No page numbering ----------
\\pagenumbering{gobble}
\\setlength{\\parindent}{0pt}

% ---------- Compact lists ----------
\\setlist[itemize]{leftmargin=1.1em, itemsep=0pt, topsep=1pt, parsep=0pt}
\\setlength{\\emergencystretch}{2em}

\\begin{document}

% ================= HEADER =================
\\begin{center}
    {\\Large \\bfseries \\color{darkgray} ${escapeLatex(header.fullName.toUpperCase())}}\\\\[2pt]
    {${escapeLatex(header.jobTitle)}}\\\\[4pt]
    \\small
    ${escapeLatex(header.phone)} \\;$\\vert$\\;
    \\href{mailto:${header.email}}{${escapeLatex(header.email)}} \\;$\\vert$\\;
    ${buildHeaderLinks(header.cvLinks)}
\\end{center}

% ================= PROFESSIONAL SUMMARY =================
\\section*{Professional Summary}
${escapeLatex(cvSummary)}

% ================= KEY ACHIEVEMENTS =================
\\section*{Key Achievements}
${buildItemizeList(keyAchievements)}

% ================= TECHNICAL SKILLS =================
\\section*{Technical Skills}
\\begin{itemize}
    \\item \\textbf{Languages \\& Runtimes:} ${formatLanguagesLine(technicalSkills.languages)}
    \\item \\textbf{Backend:} ${escapeLatex(technicalSkills.backend)}
    \\item \\textbf{Frontend:} ${escapeLatex(technicalSkills.frontend)}
    \\item \\textbf{Databases:} ${escapeLatex(technicalSkills.databases)}
    \\item \\textbf{Cloud \\& Serverless:} ${escapeLatex(technicalSkills.cloud)}
    \\item \\textbf{Other:} ${escapeLatex(technicalSkills.other)}
\\end{itemize}

% ================= PROFESSIONAL EXPERIENCE =================
\\section*{Professional Experience}

${buildExperienceSection(experience)}

% ================= EDUCATION =================
\\section*{Education}
\\textbf{${escapeLatex(education.degree)}} \\hfill \\textit{Graduated ${escapeLatex(education.graduationDate)}}\\\\
${escapeLatex(education.institution)}

% ================= LANGUAGES =================
\\section*{Languages}
${buildLanguagesSection(languages)}

\\end{document}
`;

  writeFileSync(outputPath, tex, 'utf-8');
  console.log(`cv.tex generated successfully at ${outputPath}`);
}

main();