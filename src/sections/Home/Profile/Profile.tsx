import { Typewriter } from 'react-simple-typewriter'
import './Profile.css'
import ScrollService from '../../../services/ScrollService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICON_MAP_SQUARE } from '../../../constants/socialIcons';
import profileJson from '../../../data/profile.json';
import type { ProfileData } from '../../../types/profile';

const profileData = profileJson as ProfileData;

export default function Profile() {
  const { name, tagline, cvPath, typewriterWords, socialLinks, cvDownload } = profileData;
  return (
    <section className='profile-container' aria-label='Hero'>
      <div className='profile-parent'>
        <div className='profile-details'>
          <div className='profile-links'>
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon className='icon' icon={ICON_MAP_SQUARE[label]} />
              </a>
            ))}
          </div>
          <p className='profile-details-name'>
            Hello, I'm <span className='highlighted-text'>{name}</span>
          </p>
          <div className='profile-details-role'>
            <h1>
              <Typewriter
                words={typewriterWords}
                typeSpeed={100}
                deleteSpeed={40}
                cursor
                loop
              />
            </h1>
            <p className='profile-role-tagline'>{tagline}</p>
          </div>
          <div className='profile-options'>
            <button className='btn primary-btn' onClick={() => ScrollService.scrollHandler.scrollToHireMe()}>Hire Me</button>
            <a
              href={cvPath}
              download={cvDownload}
              className='btn highlighted-btn'
            >Get Resume</a>
          </div>
        </div>
        <div className='profile-picture'>
          <div className='profile-picture-background'></div>
        </div>
      </div>
    </section>
  )
}