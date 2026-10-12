import SectionHeading from '../components/ui/SectionHeading';
import StatusDot from '../components/ui/StatusDot';
import TechChips from '../components/ui/TechChips';
import { careerStart, chronological, cv, experience, roleMonths } from '../lib/career';
import { formatDuration, formatMonth, parseMonth } from '../lib/dates';

/** Oldest roles get the lightest shade; the current role uses the accent. */
const timelineShades = ['bg-tl-1 text-ink', 'bg-tl-2 text-ink'];

function Timeline() {
  return (
    <div className='flex flex-col gap-1.5'>
      <ol
        className='flex h-[34px] overflow-hidden rounded-[7px] border border-line'
        aria-label='Career timeline, oldest to newest'
      >
        {chronological.map((role, index) => {
          const isCurrent = role.end === null;
          const shade = isCurrent ? 'bg-accent text-on-accent' : timelineShades[Math.min(index, timelineShades.length - 1)];
          return (
            <li
              key={`${role.company}-${role.start}`}
              style={{ flex: `${roleMonths(role)} 1 0` }}
              className={`flex min-w-0 items-center px-2.5 text-xs font-semibold ${shade}`}
              title={`${role.company} · ${formatDuration(roleMonths(role))}`}
            >
              <span className='truncate'>
                {role.company}
                {isCurrent && ' · current'}
              </span>
            </li>
          );
        })}
      </ol>
      <div className='flex justify-between font-geist-mono text-xs text-muted'>
        <span>{formatMonth(careerStart)}</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id='experience' aria-labelledby='experience-title' className='flex scroll-mt-20 flex-col gap-4'>
      <SectionHeading
        id='experience-title'
        title='Experience'
        api={{ path: '/experience', status: `200 OK · ${experience.length} roles` }}
      />

      <div className='flex flex-col gap-6 rounded-[10px] border border-line bg-surface p-5 sm:p-[22px]'>
        <Timeline />

        <div className='flex flex-col gap-2.5'>
          <h3 className='text-sm font-semibold'>Key achievements</h3>
          <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {cv.keyAchievements.map((achievement) => (
              <li
                key={achievement}
                className='rounded-[9px] border border-line bg-inset p-3.5 text-sm leading-relaxed text-ink-2'
              >
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        {experience.map((role) => {
          const isCurrent = role.end === null;
          return (
            <article
              key={`${role.company}-${role.start}`}
              className='flex flex-wrap gap-x-7 gap-y-2.5 border-t border-line pt-5'
            >
              <div className='flex max-w-[190px] flex-[1_1_170px] flex-col gap-1'>
                <strong className='text-xl font-semibold'>{formatDuration(roleMonths(role))}</strong>
                <span className='font-geist-mono text-xs text-muted'>
                  {formatMonth(parseMonth(role.start))} — {role.end ? formatMonth(parseMonth(role.end)) : 'Present'}
                </span>
                {isCurrent && (
                  <span className='inline-flex items-center gap-1.5 text-[13px] text-accent'>
                    <StatusDot />
                    Current
                  </span>
                )}
              </div>

              <div className='flex min-w-0 flex-[999_1_520px] flex-col gap-2.5'>
                <h3 className='text-xl font-semibold'>
                  {role.role} · {role.company}
                </h3>
                <ul className='flex list-disc flex-col gap-1.5 pl-[18px] leading-relaxed text-ink-2 marker:text-muted'>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <TechChips items={role.stack} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;
