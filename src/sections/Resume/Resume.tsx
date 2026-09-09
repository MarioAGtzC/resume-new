import { useState } from 'react';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import type { SectionProps } from '../../config/sections';
import type { Experience } from '../../types/experience';
import experienceJson from '../../data/experience.json';
import './Resume.css';

const experiences = experienceJson as Experience[];

interface ExperienceItemProps {
  experience: Experience;
  isFirst: boolean;
  isLast: boolean;
}

function ExperienceItem({ experience, isFirst, isLast }: ExperienceItemProps) {
  const { role, company, period, bullets } = experience;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatPeriodShort = (period: string) =>
  period.replace(/January|February|March|April|May|June|July|August|September|October|November|December/g,
    (m) => m.slice(0, 3));

  return (
    <div className='experience-row'>
      <div className='experience-marker-col'>
        {!isFirst && <span className='experience-line experience-line--up' />}
        {!isLast && <span className='experience-line experience-line--down' />}
        <span className='experience-marker' />
      </div>
 
      <div className='experience-content'>
        <div className='experience-header'>
          <div>
            <h3 className='experience-role'>{role}</h3>
            <p className='experience-company'>{company}</p>
          </div>
          <span className='experience-period'>
            <span className='period-full'>{period}</span>
            <span className='period-short'>{formatPeriodShort(period)}</span>
          </span>
        </div>

        <div className='experience-footer'>
          <ul className='experience-bullets'>
            {bullets.map((bullet, index) => (
              <li key={index} className='experience-bullet'>{bullet}</li>
            ))}
          </ul>
          {/* <button
            type='button'
            className='experience-expand-btn highlighted-btn'
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button> */}
        </div>
      </div>

      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)}>
          hola
        </div>
      )}
    </div>
  );
}

export default function Resume({id}: SectionProps) {
  return (
    <section className='resume-container' id={id}>
      <ScreenHeading title={'Resume'} subHeading={'My formal Bio Details'} />
      <div className="resume-card-exterior">
        <div className='resume-card'>
          <div className='experience-list'>
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={index}
                experience={experience}
                isFirst={index === 0}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};