import SocialIcon from '../ui/SocialIcon';
import { SITE } from '../../constants/site';
import { handleDownload } from '../../lib/downloadFile';

function Footer() {
  const { cvPath, cvDownload, socialLinks } = SITE.profile;

  return (
    <footer className='border-t border-line'>
      <div className='mx-auto flex max-w-290 flex-col items-center gap-4 px-4 py-6 text-[13px] text-muted sm:flex-row sm:justify-between md:px-8'>
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>

        <ul className='flex items-center gap-4'>
          {socialLinks.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='text-muted transition-colors hover:text-accent'
              >
                <SocialIcon label={label} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={cvPath}
          download={cvDownload}
          onClick={handleDownload(cvPath, cvDownload)}
          className='font-medium text-ink underline-offset-4 transition-colors hover:text-accent hover:underline'
        >
          Download CV
        </a>
      </div>
    </footer>
  );
}

export default Footer;
