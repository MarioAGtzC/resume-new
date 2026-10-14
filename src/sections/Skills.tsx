import SectionHeading from '../components/ui/SectionHeading';
import TechChips from '../components/ui/TechChips';
import { cv } from '../lib/career';
import { formatShortDuration, monthsBetween, parseMonth, splitList } from '../lib/dates';

const groups = [
  { label: 'Backend', value: cv.technicalSkills.backend },
  { label: 'Cloud', value: cv.technicalSkills.cloud },
  { label: 'Databases', value: cv.technicalSkills.databases },
  { label: 'Frontend', value: cv.technicalSkills.frontend },
];

function Skills() {
  const languages = cv.technicalSkills.languages.map((language) => ({
    name: language.name,
    months: monthsBetween(parseMonth(language.startDate)),
  }));
  const longest = Math.max(...languages.map((language) => language.months));

  return (
    <section id='skills' aria-labelledby='skills-title' className='flex scroll-mt-20 flex-col gap-4'>
      <SectionHeading id='skills-title' title='Skills' api={{ path: '/skills', status: '200 OK' }} />

      <div className='flex flex-wrap gap-4'>
        <div className='flex flex-[1_1_320px] flex-col gap-3.5 rounded-[10px] border border-line bg-surface p-5 sm:p-5.5'>
          <h3 className='text-[13px] text-muted'>Languages &amp; runtimes · years of use</h3>
          <ul className='flex flex-col gap-3'>
            {languages.map((language) => (
              <li key={language.name} className='grid grid-cols-[96px_1fr_56px] items-center gap-3'>
                <span className='text-[15px]'>{language.name}</span>
                <span className='h-2 overflow-hidden rounded-full bg-surface-2' aria-hidden='true'>
                  <span
                    className='block h-full rounded-full bg-accent'
                    style={{ width: `${Math.max(4, (language.months / longest) * 100)}%` }}
                  />
                </span>
                <span className='text-right font-geist-mono text-xs text-muted'>
                  {formatShortDuration(language.months)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <dl className='flex flex-[999_1_480px] flex-col gap-4 rounded-[10px] border border-line bg-surface p-5 sm:p-5.5'>
          {groups.map((group) => (
            <div key={group.label} className='flex flex-wrap items-baseline gap-x-4 gap-y-2'>
              <dt className='w-24 shrink-0 text-[13px] text-muted'>{group.label}</dt>
              <dd className='min-w-0 flex-1'>
                <TechChips items={splitList(group.value)} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Skills;
