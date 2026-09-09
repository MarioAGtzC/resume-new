import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Typewriter } from 'react-simple-typewriter'

import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import type { SectionProps } from '../../config/sections';
import type { ProfileData } from '../../types/profile';
import profileJson from '../../data/profile.json';

import './ContactMe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ICON_MAP_REGULAR } from '../../constants/socialIcons';

const { socialLinks } = profileJson as ProfileData;

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function ContactMe({id}: SectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [bool, setBool] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);

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

    setBool(true);

    const templateParams = {
      name,
      message,
      email,
      initials: getInitials(name),
      time: new Date().toLocaleString('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      word_count: getWordCount(message),
      subject: `Re: Message from ${name} via website`,
      origin: window.location.href,
      device_info: navigator.userAgent,
      ip: '', // TODO: populate server-side when migrating to a backend/API
    };

    const now = Date.now();
    if (now - lastSubmit < 30000) {
      toast.error('Espera un momento antes de enviar otro mensaje');
      setBool(false);
      return;
    }
    setLastSubmit(now);

    try {
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      if (res.status === 200) {
        toast.success('Mensaje enviado correctamente');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error('Ocurrió un error al enviar el formulario');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocurrió un error al enviar el formulario');
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