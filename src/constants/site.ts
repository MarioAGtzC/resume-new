import profileJson from '../data/profile.json';
import type { ProfileData } from '../types/profile';

const profile = profileJson as ProfileData;

export const SITE = {
  name: 'Mario Gutiérrez',
  location: 'Colima, MX',
  profile,
  portfolioUrl: profile.socialLinks.find((link) => link.label === 'Portfolio')?.href ?? '',
} as const;
