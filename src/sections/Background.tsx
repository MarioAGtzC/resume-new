import { cv } from '../lib/career';

const cardStyles = 'flex flex-[1_1_320px] flex-col gap-1.5 rounded-[10px] border border-line bg-surface p-[18px]';

function Background() {
  const { education, languages } = cv;

  return (
    <section aria-label='Education and languages' className='flex flex-wrap gap-4'>
      <div className={cardStyles}>
        <h2 className='text-[13px] text-muted'>Education</h2>
        <p className='font-semibold'>{education.degree}</p>
        <p className='text-sm text-ink-2'>
          {education.institution} · <span className='font-geist-mono text-xs text-muted'>{education.graduationDate}</span>
        </p>
      </div>

      <div className={cardStyles}>
        <h2 className='text-[13px] text-muted'>Languages</h2>
        <ul className='flex flex-col gap-1'>
          {languages.map((language) => (
            <li key={language.language} className='text-sm text-ink-2'>
              <span className='font-semibold text-ink'>{language.language}</span> · {language.level}
              {language.certLabel && ` ${language.certLabel}`}
              {language.certLink && (
                <>
                  {' · '}
                  <a
                    href={language.certLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-accent underline-offset-4 hover:underline'
                  >
                    EF SET certificate ↗
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Background;
