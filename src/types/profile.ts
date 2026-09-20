export interface SocialLink {
  href: string;
  label: 'LinkedIn' | 'GitHub' | 'Instagram' | 'Portfolio';
}

export interface ProfileData {
  name: string;
  tagline: string;
  cvPath: string;
  cvDownload: string;
  typewriterWords: string[];
  socialLinks: SocialLink[];
}