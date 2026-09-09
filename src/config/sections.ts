import Home from '../sections/Home/Home';
import AboutMe from '../sections/AboutMe/AboutMe';
import Resume from '../sections/Resume/Resume';
import ContactMe from '../sections/ContactMe/ContactMe';

export interface SectionProps {
  id: string;
  screenName: string;
}

export interface Section {
  screen_name: string;
  component: React.ComponentType<SectionProps>;
  alreadyRendered?: boolean;
}

export const SECTIONS: Section[] = [
  {
    screen_name: 'Home',
    component: Home,
  },
  {
    screen_name: 'About Me',
    component: AboutMe,
  },
  {
    screen_name: 'Resume',
    component: Resume,
  },
  {
    screen_name: 'Contact Me',
    component: ContactMe,
  },
];

export const GET_SECTION_INDEX = (screen_name: string) => {
  if (!screen_name) return -1;

  for (let i = 0; i < SECTIONS.length; i++) {
    if (SECTIONS[i].screen_name === screen_name) return i;
  }

  return -1;
};