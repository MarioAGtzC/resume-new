import ThemeToggle from '../ui/ThemeToggle';
import StatusDot from '../ui/StatusDot';
import { SITE } from '../../constants/site';

const navLinks = [
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

function Header() {
  return (
    <header className='sticky top-0 z-50 border-b border-line bg-bar/90 backdrop-blur'>
      <div className='mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-4 py-3.5 md:px-8'>
        <a href='#top' className='flex items-center gap-2 text-[15px] font-semibold text-ink'>
          <StatusDot />
          {SITE.name}
        </a>

        <nav className='flex items-center gap-6' aria-label='Main'>
          <ul className='hidden items-center gap-6 md:flex'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className='text-sm text-ink-2 transition-colors hover:text-ink'>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          {SITE.portfolioUrl && (
            <a
              href={SITE.portfolioUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='hidden rounded-md border border-line px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-line-strong sm:inline-block'
            >
              Portfolio ↗
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
