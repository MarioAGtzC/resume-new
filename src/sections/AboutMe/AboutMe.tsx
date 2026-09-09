import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import ScrollService from '../../services/ScrollService';
import type { SectionProps } from '../../config/sections';
import aboutJson from '../../data/about.json';
import profileJson from '../../data/profile.json';
import type { AboutData } from '../../types/about';
import type { ProfileData } from '../../types/profile';
import './AboutMe.css';

const aboutData = aboutJson as AboutData;
const { cvPath, cvDownload } = profileJson as ProfileData;

export default function AboutMe({id}: SectionProps) {
  const renderHighlight = () => {
    return aboutData.highlights.bullets.map((value, i) => (
      <div className='highlight' key={i}>
        <div className='highlight-blob'></div>
        <span>{value}</span>
      </div>
    ));
  };

  return (
    <section className='about-me-container fade-in' id={id}>
      <div className='about-me-parent'>
        <ScreenHeading title={'About Me'} subHeading={'Why Choose Me?'} />
        <article className='about-me-card'>
          <div className='about-me-profile'></div>
          <div className='about-me-details'>
            <span className='about-me-description'>
              {aboutData.description}
            </span>
            <div className='about-me-highlights'>
              <div className='highlight-heading'>
                <span>{aboutData.highlights.heading}</span>
              </div>
              {renderHighlight()}
            </div>
            <div className='about-me-options'>
              <button
                className='btn primary-btn'
                onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
              >Hire Me</button>
              <a
                href={cvPath}
                download={cvDownload}
                className='btn highlighted-btn'
              >
                Get Resume
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
