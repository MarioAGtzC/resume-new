import { useState, type SubmitEvent } from 'react';
import { toast } from 'react-toastify';
import { Turnstile } from '@marsidev/react-turnstile';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa6';

import SectionHeading from '../components/ui/SectionHeading';
import SocialIcon from '../components/ui/SocialIcon';
import { buttonStyles } from '../components/ui/buttonStyles';
import { SITE } from '../constants/site';

const SITE_KEY = import.meta.env.VITE_SITE_KEY as string;
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL as string;

const fieldStyles =
  'w-full rounded-lg border border-line bg-canvas px-3 text-ink transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-glow';
const labelStyles = 'text-[13px] text-muted';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');

  const resetFields = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const submitForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (website) {
      toast.success('Message sent!');
      resetFields();
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
    setIsSending(true);

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
      resetFields();
      setTurnstileToken('');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while sending the form');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id='contact' aria-labelledby='contact-title' className='flex scroll-mt-20 flex-col gap-4'>
      <SectionHeading id='contact-title' title='Contact' api={{ method: 'POST', path: '/contact' }} />

      <div className='flex flex-wrap gap-4'>
        <div className='flex flex-[1_1_280px] flex-col gap-4 rounded-[10px] border border-line bg-surface p-5 sm:p-5.5'>
          <p className='leading-relaxed text-ink-2'>
            Hiring for a backend role or have a question about my experience? Send a message and I'll reply by email.
          </p>
          <ul className='flex flex-col gap-2.5'>
            {SITE.profile.socialLinks.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-accent'
                >
                  <SocialIcon label={label} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={submitForm}
          className='relative flex flex-[999_1_480px] flex-col gap-3.5 rounded-[10px] border border-line bg-surface p-5 sm:p-5.5'
        >
          {/* Honeypot: display:none keeps browser autofill (and people) out of it; simple bots still fill it. */}
          <div hidden aria-hidden='true'>
            <input
              type='text'
              name='hp_extra'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete='off'
            />
          </div>

          <div className='grid gap-3.5 sm:grid-cols-2'>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='name' className={labelStyles}>
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`${fieldStyles} h-10.5`}
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='email' className={labelStyles}>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${fieldStyles} h-10.5`}
              />
            </div>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='message' className={labelStyles}>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              autoComplete='off'
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={`${fieldStyles} resize-y py-2.5`}
            />
          </div>

          <Turnstile
            siteKey={SITE_KEY}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken('')}
            onError={() => setTurnstileToken('')}
            options={{ size: 'flexible', theme: 'auto', language: 'en' }}
          />

          <button type='submit' disabled={isSending} className={`${buttonStyles.accent} self-start`}>
            {isSending ? <FaSpinner aria-hidden='true' className='animate-spin' /> : <FaPaperPlane aria-hidden='true' />}
            {isSending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
