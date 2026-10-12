import { FaBriefcase, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import type { SocialLink } from '../../types/profile';

const ICONS = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Portfolio: FaBriefcase,
} as const;

function SocialIcon({ label, size = 18 }: { label: SocialLink['label']; size?: number }) {
  const Icon = ICONS[label];
  return <Icon aria-hidden='true' size={size} />;
}

export default SocialIcon;
