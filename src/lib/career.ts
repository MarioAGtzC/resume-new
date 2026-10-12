import experienceJson from '../data/experience.json';
import cvJson from '../data/cv.json';
import type { Experience } from '../types/experience';
import type { CvData } from '../types/cv';
import { monthsBetween, parseMonth } from './dates';

export const experience = experienceJson as Experience[];
export const cv = cvJson as CvData;

/** Roles sorted from oldest to newest. */
export const chronological = [...experience].sort((a, b) => a.start.localeCompare(b.start));

export const careerStart = parseMonth(chronological[0].start);

export function roleMonths(role: Experience) {
  const end = role.end ? parseMonth(role.end) : new Date();
  return Math.max(1, monthsBetween(parseMonth(role.start), end));
}

export const currentRole = experience.find((role) => role.end === null);

export const companyCount = new Set(experience.map((role) => role.company)).size;

/** "(C2)" → "C2" */
export const englishLevel = cv.languages
  .find((language) => language.language === 'English')
  ?.certLabel?.replace(/[()]/g, '')
  .trim();
