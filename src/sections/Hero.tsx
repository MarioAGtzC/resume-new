import profilePhoto from '../assets/profilephoto.jfif';
import StatusDot from '../components/ui/StatusDot';
import { buttonStyles } from '../components/ui/buttonStyles';
import { SITE } from '../constants/site';
import { careerStart, companyCount, cv, englishLevel } from '../lib/career';
import { formatShortDuration, monthsBetween } from '../lib/dates';
import { handleDownload } from '../lib/downloadFile';

const pillStyles =
  'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 font-geist-mono text-xs';

function Hero() {
  const { tagline, cvPath, cvDownload } = SITE.profile;

  const stats = [
    { value: formatShortDuration(monthsBetween(careerStart)), label: 'experience' },
    { value: String(companyCount), label: 'companies' },
    ...(englishLevel ? [{ value: `EN ${englishLevel}`, label: 'bilingual EN / ES' }] : []),
  ];

  return (
    <section id='top' className='flex flex-wrap items-center justify-between gap-10 pt-14 sm:pt-16'>
      <div className='flex min-w-0 flex-[999_1_560px] flex-col gap-4.5'>
        <div className='flex flex-wrap gap-2.5'>
          <span className={pillStyles}>
            <StatusDot />
            Open to backend roles
          </span>
          <span className={`${pillStyles} text-muted`}>{SITE.location} · UTC−6</span>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-[15px] text-muted'>{SITE.name}</p>
          <h1 className='text-[44px] leading-none font-bold tracking-[-0.03em] text-balance sm:text-[64px]'>
            {cv.header.jobTitle}
          </h1>
        </div>

        <p className='max-w-[58ch] text-lg leading-relaxed text-ink-2'>{tagline}</p>

        <dl className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='flex flex-col-reverse gap-0.5 rounded-[10px] border border-line bg-surface px-4 py-3'>
              <dt className='text-[13px] text-muted'>{stat.label}</dt>
              <dd className='text-[22px] font-semibold tracking-[-0.01em]'>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className='flex flex-wrap gap-2.5 pt-1'>
          <a href={cvPath} download={cvDownload} onClick={handleDownload(cvPath, cvDownload)} className={buttonStyles.accent}>
            Download CV
          </a>
          {SITE.portfolioUrl && (
            <a href={SITE.portfolioUrl} target='_blank' rel='noopener noreferrer' className={buttonStyles.outline}>
              See portfolio ↗
            </a>
          )}
        </div>
      </div>

      <div className='hidden lg:block mx-auto w-full max-w-60 flex-[1_1_200px]'>
        <img
          src={profilePhoto}
          alt={`Portrait of ${SITE.name}`}
          width={240}
          height={240}
          className='aspect-square w-full rounded-full border border-line object-cover shadow-[0_0_0_6px_var(--color-glow)]'
        />
      </div>
    </section>
  );
}

export default Hero;
