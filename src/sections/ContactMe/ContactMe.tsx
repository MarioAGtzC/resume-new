import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { toast } from 'react-toastify';
import { Typewriter } from 'react-simple-typewriter'
import { Turnstile } from '@marsidev/react-turnstile';

import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import type { SectionProps } from '../../config/sections';
import type { ProfileData } from '../../types/profile';
import profileJson from '../../data/profile.json';

import './ContactMe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ICON_MAP_REGULAR } from '../../constants/socialIcons';

const { socialLinks } = profileJson as ProfileData;

const SITE_KEY = import.meta.env.VITE_SITE_KEY as string;
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL as string;

export default function ContactMe({id}: SectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [bool, setBool] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const submitForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (website) {
      toast.success('Message sent!');
      setName('');
      setEmail('');
      setMessage('');
      return;
    }

    if (!turnstileToken) {
      toast.error('Please complete the verification before sending');
      return;
    }

    const now = Date.now();
    if (now - lastSubmit < 30000) {
      toast.error('Please wait a moment before sending another message');
      return;
    }
    setLastSubmit(now);

    setBool(true);

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, turnstileToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
      }

      toast.success('Message sent successfully');
      setName('');
      setEmail('');
      setMessage('');
      setTurnstileToken('');
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while sending the form');
    } finally {
      setBool(false);
    }
  };

  return (
    <section className='main-container' id={id}>
      <ScreenHeading subHeading={'Lets Keep In Touch'} title={'Contact Me'} />
      <div className='central-form'>
        <div className='col'>
          <h2>
            <Typewriter words={['Get In Touch']} cursor/>
          </h2>
          {socialLinks.map(({ href, label }) => (
            <a key={label} href={href}>
              <FontAwesomeIcon className='icon' icon={ICON_MAP_REGULAR[label]} />
            </a>
          ))}
        </div>
        <div className='back-form'>
          <form onSubmit={submitForm}>
            <input
              type='text'
              name='contact_hp_field'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete='off'
              aria-hidden='true'
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
            />
            <label htmlFor='name'>Name</label>
            <input id='name' name='name' type='text' autoComplete='name' onChange={handleName} value={name} required />

            <label htmlFor='email'>Email</label>
            <input id='email' name='email' type='email' autoComplete='email' onChange={handleEmail} value={email} required />

            <label htmlFor='message'>Message</label>
            <textarea id='message' name='message' autoComplete='off' onChange={handleMessage} value={message} required />

            <div className='turnstile'>
              <Turnstile
                siteKey={SITE_KEY}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken('')}
                onError={() => setTurnstileToken('')}
                options={{
                  size: 'flexible',
                  theme: 'dark',
                  language: 'en'
                }}
              />
            </div>

            <button type='submit' disabled={bool}>
              send
              <FontAwesomeIcon className='icon' icon={faPaperPlane} />
              {bool && (
                <span className='load'>
                  <FontAwesomeIcon icon={faSpinner} className='spinner' spin />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}