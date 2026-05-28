import { Typewriter } from 'react-simple-typewriter'
import './Profile.css'

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/marioagtz/', icon: 'fa-linkedin', label: 'LinkedIn' },
  { href: 'https://github.com/MarioAGtzC/', icon: 'fa-square-github', label: 'GitHub' },
  { href: 'https://github.com/MarioAGtzC/', icon: 'fa-square-instagram', label: 'Instagram' },
];

const TYPEWRITER_WORDS = ['FullStack Developer', 'MERN Stack Developer'];
const CV_PATH = 'Mario Gutierrez CV.pdf';

export default function Profile() {
  return (
    <section className='profile-container' aria-label='Hero'>
      <div className='profile-parent'>
        <div>
          <div className='profile-links'>
            {SOCIAL_LINKS.map(({href, icon, label}) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className={`fa-brands ${icon}`} aria-hidden='true'></i>
              </a>
            ))}
          </div>
          <p className='profile-details-name'>
            Hello, I'm <span className='highlighted-text'>Mario</span>
          </p>
          <div className='profile-details-role'>
            <h1>
              <Typewriter
                words={TYPEWRITER_WORDS}
                typeSpeed={100}
                deleteSpeed={40}
                cursor
                loop
              />
            </h1>
            <p className='profile-role-tagline'>
              Knack of building applications with front and back end operations
            </p>
          </div>
          <div>
            <button className='btn primary-btn'>Hire Me</button>
            <a
              href={CV_PATH}
              download={CV_PATH}
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